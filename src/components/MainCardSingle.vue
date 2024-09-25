<script setup>
import { faker } from '@faker-js/faker';
const fullname = faker.person.firstName()

</script>

<template>
    {{ fullname }}  <br/>
</template>