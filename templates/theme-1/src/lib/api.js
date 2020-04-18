import env from '../../../api'

export default function sendOrderToAPI(order) {
  const request = {
    headers: new Headers({
      'Content-Type': 'application/json',
    }),
    method: 'POST',
    body: JSON.stringify(order),
  }
  console.log(env, request)

  return fetch(env.API_PLACE_ORDER_URL || '/', request)
}
