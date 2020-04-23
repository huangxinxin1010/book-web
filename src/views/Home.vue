<template>
    <div class="home">
        <topCont></topCont>
        <menuVue></menuVue>
        <banner></banner>
        <category></category>
        <pieceList></pieceList>
        <footerBlock></footerBlock>
    </div>
</template>

<script>
    import topCont from '@/components/Home/top-cont';
    import menuVue from '@/components/Home/menu';
    import banner from '@/components/Home/banner';
    import category from '@/components/Home/category';
    import pieceList from '@/components/Home/piece-list';
    import footerBlock from '@/components/Home/footerBlock';

    export default {
        name: 'home',
        components: {
            topCont,
            menuVue,
            banner,
            category,
            pieceList,
            footerBlock
        }
    }
</script>

