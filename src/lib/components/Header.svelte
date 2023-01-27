<script lang="ts">
    import { page } from '$app/stores'
    $: URL = $page.url.pathname
</script>

<header class="header">
    <div class="container">
        <div class="content">
            <a href="/" class="text">Тестовое задание для Embedika</a>
            <div class="nav">
                <a class="link" href="/cars" class:active={ URL == '/cars' }>Справочник автомобилей</a>
            </div>
        </div>
    </div>
</header>

<style>
    .header {
        padding: 1em 0;
        margin-bottom: 1em;
    }

    .content {
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 0.15em solid var(--pink-color);
    }

    .text {
        font-size: 2em;
        font-weight: 400;
        color: var(--pink-color);
    }

    .link {
        display: inline-block;
        padding: 0.3em 0.5em;
        border-radius: 0.5em;
        color: var(--pink-color);
        text-decoration: none;
        transition: 0.1s;
    }

    .link:first-child {
        margin-right: 0.5em;
    }

    .link:hover, .link.active {
        background-color: var(--pink-color);
        color: var(--white-color);
    }
</style>