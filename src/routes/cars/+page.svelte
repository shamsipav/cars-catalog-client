<script lang="ts">
    import type { ICar } from '$lib/types'
    import { Form, Card } from '$components'
    import { API_URL } from '$lib/consts'

    let cars: ICar[] = []

    async function getCars() {
        const response = await fetch(`${API_URL}/cars`)
        const carsJson = await response.json()

        if (response.ok) {
            cars = carsJson
            return cars
        }
        throw new Error(await response.text())
    
}

    let promise = getCars()

    function handleSuccess() {
        promise = getCars()
}
</script>

<div class="container">
    <h2 class="heading">Добавить новый автомобиль</h2>
    <Form on:succes={handleSuccess}/>
    <br/>
    {#await promise}
    	<p>Загрузка автомобилей...</p>
    {:then cars}
        {#if cars?.length > 0}
            <h2 class="heading">Список автомобилей</h2>
            <div class="grid grid-3">
                {#each cars as car}
                    <Card 
                        id={car.id} 
                        licensePlate={car.licensePlate} 
                        brand={car.brand} 
                        color={car.color}
                        releaseYear={car.releaseYear}
                        on:delete={handleSuccess}
                    />
                {/each}
            </div>
        {:else if cars?.length == 0}
            <p>В справочнике еще нет автомобилей</p>
        {/if}
    {:catch error}
        <p>При загрузке автомобилей произошла ошибка:</p>
    	<p style="color: lightcoral">{error.message}</p>
    {/await}
</div>

<style>

</style>