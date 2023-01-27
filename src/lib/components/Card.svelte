<script lang="ts">
    import { createEventDispatcher } from 'svelte'
    import { API_URL } from '$lib/consts'
    import dayjs from 'dayjs'

const dispatch = createEventDispatcher()

    export let id: number
    export let licensePlate: string
    export let brand: string
    export let color: string
    export let releaseYear: string

    const deleteCar = async () => {
        try {
            let res = await fetch(API_URL + `/cars/${id}`, {
			    method: 'DELETE'
            })

            if (res.status == 200) {
                alert('Автомобиль успешно удален')
                dispatch('delete', id)
            } else {
                alert(`Произошла ошибка при выполнении запроса: ${await res.text()}`)
            }
        } catch (error) {
            alert(`Произошла ошибка при выполнении запроса: ${error}`)
        }
    }
</script>

<div class="card">
    <p><span>Номер:</span> {licensePlate}</p>
    <p><span>Марка:</span> {brand}</p>
    <p><span>Цвет:</span> {color ? color : 'Не указан'}</p>
    <p class="year"><span>Год выпуска:</span> {dayjs(releaseYear).format('YYYY')}</p>
    <button class="button delete" on:click={deleteCar}>Удалить</button>
    <a class="button edit" href="/cars/{id}">Редактировать</a>
</div>

<style>
    .card {
        padding: 1em;
        border-radius: 0.5em;
        box-shadow: 0px 5px 10px 2px rgba(34, 60, 80, 0.2);
    }

    .year {
        text-align: right;
    }

    span {
        font-weight: 300;
    }

    .button {
        padding: 1px 6px;
        border: none;
        border-radius: 0.5em;
        cursor: pointer;
        transition: 0.1s;
    }

    .delete {
        background-color: transparent;
        color: lightcoral;
    }

    .delete:hover {
        background-color: lightcoral;
        color: white;
    }

    .edit {
        color: var(--pink-color);;
    }

    .edit:hover {
        background-color: var(--pink-color);
        color: white;
    }
</style>