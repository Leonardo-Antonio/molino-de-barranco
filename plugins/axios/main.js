import { Notification } from 'element-ui'

export default function ({ $axios, redirect }, inject) {
  const instance = $axios.create({
    baseURL: 'http://localhost:8000/api/v1',
  })

  instance.onRequest((config) => {
    console.log('Petición a -> ' + config.url)
  })

  instance.onResponse((response) => {
    if (response.status == 201) {
      if (response.config.url == '/sales') return
      Notification.success({
        title: `Mensaje`,
        message: `Creado correctamente`,
      })
    }

    console.log(response.status)
  })

  instance.onError((error) => {
    if (
      error.response.data.message != undefined ||
      error.response.data.message != null
    ) {
      Notification.error({
        title: `Mensaje`,
        message: `${error.response.data.message}`,
      })
    }
  })

  inject('api', instance)
}
