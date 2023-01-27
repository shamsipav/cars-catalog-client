<script lang="ts">
    // TODO: REPLACE ALL CODE TO FORM COMPONENT (!)

    import dayjs from 'dayjs'
    import { API_URL } from '$lib/consts'
    import type { ICar } from '$lib/types'

    export let data: any
    let car: ICar = data.car

    let succesText = ''

    const handleSubmit = async (e) => {
        e.preventDefault()
        const ACTION_URL = e.target.action

        const formData = new FormData(e.target)
        const data = {}
        formData.forEach((value, key) => data[key] = value)

        try {
            let res = await fetch(ACTION_URL, {
                method: 'PUT',
            	headers: {
            	    'Content-Type': 'application/json',
            	},
                body: JSON.stringify(data)
            })

            console.log(res)

            if (res.ok) {
        	    succesText = await res.text()
                setTimeout(() => window.history.back(), 1500)
        	} else {
        	    alert(`Произошла ошибка при выполнении запроса: ${await res.text()}`)
        	}
        } catch (error) {
        	alert(`Произошла ошибка при выполнении запроса: ${error}`)
        }
}
</script>

<div class="container">
    {#if car}
        <h2 class="heading">Редактирование автомобиля {car.brand} [{car.licensePlate}]</h2>
        <form method="PUT" action="{API_URL}/cars/{car.id}" on:submit|preventDefault={handleSubmit}>
            <input name="licensePlate" placeholder="Номер" autocomplete="off" value={car.licensePlate} required />
            <input name="brand" placeholder="Марка" autocomplete="off" value={car.brand} required />
            <input name="color" placeholder="Цвет" autocomplete="off" value={car.color} />
            <input name="releaseYear" type="date" placeholder="Год выпуска" value={dayjs(car.releaseYear).format('YYYY-MM-DD')} autocomplete="off" required />
            <input class="submit" type="submit" value="Сохранить" />
            {#if succesText}
                <p class="succes">{succesText}</p>
            {/if}
        </form>
    {/if}
</div>

<style>
	form {
		max-width: 35em;
		border-radius: 0.5em;
		padding: 1.2em;
		box-shadow: 0px 5px 10px 2px rgba(34, 60, 80, 0.2);
	}

	input {
		padding: 0.5em;
		display: block;
		max-width: 100%;
		width: 100%;
		border: none;
		margin-bottom: 1em;
		border-bottom: 0.13em solid lightgray;
	}

	.submit {
		margin-top: 0.5em;
		margin-bottom: 0;
		display: inline-block;
		border-radius: 0.5em;
		padding: 0.3em 1em;
		cursor: pointer;
		width: auto;
		transition: 0.1s;
		border: none;
		font-size: 1.1em;
	}

	.submit:hover {
		background-color: var(--pink-color);
		color: var(--white-color);
	}

	.submit:focus {
		border: none;
	}

	input:focus {
    	outline: none;
		border-bottom: 0.13em solid var(--pink-color);
	}

	.succes {
		margin-top: 0.5em;
		color: #5ca95c;
	}
</style>