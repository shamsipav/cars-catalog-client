import { API_URL } from '$lib/consts'

export const load = async ({ fetch, params }) => {
    try {
        const response = await fetch(`${API_URL}/cars/${params.id}`)
        const car = await response.json()

        if (response.status == 200) {
            return { car }
        } else if (response.status) {
            const error = await response.text()
            return { error }
        }

    } catch (error) {
        return { error }
    }
}