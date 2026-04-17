output "images" {
  value = {
    backend  = local.backend_image
    frontend = local.frontend_image
    database = local.database_image
  }
}

output "backend_url" {
  value = "https://www.jimmy-localhost.com:3000/"
}

output "frontend_url" {
  value = "https://www.jimmy-localhost.com:3001/"
}

