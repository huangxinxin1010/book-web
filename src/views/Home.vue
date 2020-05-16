<template>
    <div class="home">
        <topCont></topCont>
        <menuVue></menuVue>
        <banner></banner>
        <category></category>
        <pieceList></pieceList>
        <pieceList1></pieceList1>
        <footerBlock></footerBlock>
    </div>
</template>

<script>
    import topCont from '@/components/Home/top-cont';
    import menuVue from '@/components/Home/menu';
    import banner from '@/components/Home/banner';
    import category from '@/components/Home/category';
    import pieceList from '@/components/Home/piece-list';
    import pieceList1 from '@/components/Home/piece-list1';
    import footerBlock from '@/components/Home/footerBlock';

    export default {
        name: 'home',
        components: {
            topCont,
            menuVue,
            banner,
            category,
            pieceList,
            pieceList1,
            footerBlock
        }
    }
</script>

