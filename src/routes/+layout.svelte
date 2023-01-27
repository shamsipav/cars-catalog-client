<script lang="ts">
    import { Header } from '$components'
    import 'dayjs/locale/ru'
    import dayjs from 'dayjs'

    dayjs.locale('ru')
</script>

<svelte:head>
	<title>Тестовое задание для Embedika</title>
</svelte:head>

<Header />

<slot />

<footer>
    <div class="container">
        <div class="content">
            <p class="text">Шамсимухаметов Павел | Решение тестового задания для Embedika</p>
            <p class="text">Telegram: <a class="tg" href="https://t.me/shamsipav" target="_blank">@shamsipav</a></p>
        </div>
    </div>
</footer>

<style>
    footer {
        margin-top: 5em;
        padding: 2em 0;
    }

    .content {
        padding-top: 1em;
        border-top: 0.1em solid lightgray;
    }

    .text {
        color: #505050;
        text-align: center;
    }
</style>