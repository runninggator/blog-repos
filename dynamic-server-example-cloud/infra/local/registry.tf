resource "docker_image" "registry" {
  name = "registry:2"
}

resource "docker_container" "registry" {
  name  = "local-tf-registry"
  image = docker_image.registry.image_id

  ports {
    internal = 5000
    external = 5001
  }

  restart = "unless-stopped"
}

locals {
  backend_image  = "${local.registry_host}/backend-server:${local.image_tag}"
  frontend_image = "${local.registry_host}/frontend-server:${local.image_tag}"
  database_image = "${local.registry_host}/database:${local.image_tag}"
}

resource "docker_image" "backend" {
  name = local.backend_image
  build {
    context = "${path.module}/../../backend"
  }
}

resource "null_resource" "push_backend" {
  triggers = {
    image_id = docker_image.backend.image_id
  }

  depends_on = [docker_container.registry, docker_image.backend]

  provisioner "local-exec" {
    command = "docker push ${docker_image.backend.name}"
  }
}

resource "docker_image" "frontend" {
  name = local.frontend_image
  build {
    context = "${path.module}/../../frontend"
  }
}

resource "null_resource" "push_frontend" {
  triggers = {
    image_id = docker_image.frontend.image_id
  }

  depends_on = [docker_container.registry, docker_image.frontend]

  provisioner "local-exec" {
    command = "docker push ${docker_image.frontend.name}"
  }
}

resource "docker_image" "database" {
  name = local.database_image
  build {
    context    = "${path.module}/../.."
    dockerfile = "MySQL.Dockerfile"
  }
}

resource "null_resource" "push_database" {
  triggers = {
    image_id = docker_image.database.image_id
  }

  depends_on = [docker_container.registry, docker_image.database]

  provisioner "local-exec" {
    command = "docker push ${docker_image.database.name}"
  }
}

