<script setup lang="ts">
import { computed, watch, ref } from 'vue';
import type { elevatorOrder, floorProps } from '@/utilities/interfaces';

const props = defineProps<floorProps>()
const emits = defineEmits(['callHandler'])

const width = ref(50);

const callHandlerEmit = async () => {
    console.log('hey')
    console.log(props.currentFloor, props.floor?.value)
    if (props.currentFloor !== props.floor?.value) {
        console.log('heyooooo')
        closeDoor().then(() => {
            emits('callHandler', props.floor?.value);
        });
    };
};

const isHiddenClass = computed(() => {
    return props.currentFloor === props.floor?.value ? '' : 'hidden'
})

const isCallButtonBorder = computed(() => {
    const orderExists = props.elevatorOrders?.some((order: elevatorOrder) => order.destinationFloor === props.floor?.value);
    return orderExists ? 'bg-green-600 text-white' : '';
});

const openDoor = () => {
    if (props.currentFloor === props.floor?.value && width.value === 50) {
        const interval = setInterval(() => {
            width.value--;
            console.log(width.value);
            if (width.value === 10) {
                clearInterval(interval);
                console.log('Door is open');
            }
        }, 25);
    }
};

const closeDoor = () => {
    return new Promise<void>((resolve) => {
        if (width.value === 10) {
            const interval = setInterval(() => {
                width.value++;
                console.log(width.value);
                if (width.value === 50) {
                    clearInterval(interval);
                    console.log('Door is closed');
                    resolve();
                } else {
                    resolve();
                }
            }, 25);
        }
    });
};


watch(() => props.currentFloor, () => {
    if (props.currentFloor === props.floor?.value && props.destinationFloor === props.floor?.value) {
        setTimeout(() => {
            openDoor();
        }, 1000);
    }
});
</script>

<template>
    <div class="flex">
        <div class="relative z-100 flex flex-space-between border-4 border-gray-950 border-b-0 w-32 h-32 text-6xl"
            :class="`${floor?.value === -1 ? 'border-b-4' : ''}`">
            <div class="left" :class="`${floor?.name} ${isHiddenClass}`" :style="{ width: width + '%' }">

            </div>
            <div class="right" :class="`${floor?.name} ${isHiddenClass}`" :style="{ width: width + '%' }">
            </div>
        </div>
        <button class="bg-gray-400 m-2 my-auto p-2 h-12" @click="callHandlerEmit"
            :class="isCallButtonBorder">Call</button>
        <button @click="openDoor">open</button>
        <button @click="closeDoor">close</button>
    </div>

</template>

<style scoped>
.left {
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    background-color: gray;
}

.right {
    height: 100%;
    position: absolute;
    right: 0;
    top: 0;
    background-color: gray;
}
</style>