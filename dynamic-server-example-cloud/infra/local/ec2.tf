resource "docker_network" "appnet" {
  name = "tf-appnet"
}

resource "docker_container" "database" {
  depends_on = [null_resource.push_database]

  name  = "tf-database"
  image = local.database_image
  restart = "unless-stopped"

  env = [
    "MYSQL_ROOT_PASSWORD=fake-pwd",
    "MYSQL_DATABASE=mydb",
  ]

  ports {
    internal = 3306
    external = 3306
  }

  networks_advanced {
    name    = docker_network.appnet.name
    aliases = ["database"]
  }
}

resource "docker_container" "backend" {
  depends_on = [null_resource.push_backend, docker_container.database]

  name  = "tf-backend-server"
  image = local.backend_image
  restart = "on-failure"

  env = [
    "DATABASE_HOST=database",
    "DATABASE_URL=mysql://root:fake-pwd@database:3306/mydb",
  ]

  ports {
    internal = 3000
    external = 3000
  }

  networks_advanced {
    name    = docker_network.appnet.name
    aliases = ["backend-server"]
  }
}

resource "docker_container" "frontend" {
  depends_on = [null_resource.push_frontend, docker_container.database]

  name  = "tf-frontend-server"
  image = local.frontend_image
  restart = "on-failure"

  ports {
    internal = 3001
    external = 3001
  }

  networks_advanced {
    name    = docker_network.appnet.name
    aliases = ["frontend-server"]
  }
}

