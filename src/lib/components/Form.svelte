<script lang="ts">
    import { createEventDispatcher } from 'svelte'
    import { API_URL } from '$lib/consts'

const dispatch = createEventDispatcher()

let succesText = ''

const handleSubmit = async (e) => {
        e.preventDefault()
        const ACTION_URL = e.target.action

        const formData = new FormData(e.target)
        const data = {}
        formData.forEach((value, key) => data[key] = value)

        if (e.target.method.toLowerCase() == 'get') fetch(`${ACTION_URL}?${data}`)
        else {
            try {
                let res = await fetch(ACTION_URL, {
                    method: 'POST',
                	headers: {
                	    'Content-Type': 'application/json',
                	},
                    body: JSON.stringify(data)
                })

                if (res.ok) {
            	    succesText = await res.text()
                    dispatch('succes')
                    e.target.reset()
            	} else {
            	    alert(`Произошла ошибка при выполнении запроса: ${await res.text()}`)
            	}
            } catch (error) {
            	alert(`Произошла ошибка при выполнении запроса: ${error}`)
        	}
        }
}
</script>

<form method="POST" action="{API_URL}/cars" on:submit|preventDefault={handleSubmit}>
	<input name="licensePlate" placeholder="Номер" autocomplete="off" required />
	<input name="brand" placeholder="Марка" autocomplete="off" required />
	<input name="color" placeholder="Цвет" autocomplete="off" />
	<input name="releaseYear" type="date" placeholder="Год выпуска" autocomplete="off" required />
    <input class="submit" type="submit" value="Добавить" />
	{#if succesText}
		<p class="succes">{succesText}</p>
	{/if}
</form>

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