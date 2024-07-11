<script setup lang="ts">
import { ref, onMounted, watch, computed } from 'vue';

interface elevatorOrder {
  id: string;
  direction: string;
  destinationFloor: number;
}

const floors = [
  { name: 'basement', value: -1 },
  { name: 'ground', value: 0 },
  { name: 'first', value: 1 },
  { name: 'second', value: 2 },
  { name: 'third', value: 3 },
  { name: 'fourth', value: 4 },
  { name: 'fifth', value: 5 },
  { name: 'sixth', value: 6 },
  { name: 'seventh', value: 7 },
];

let floorElements: { [key: string]: HTMLElement | null } = {};

onMounted(() => {
  floors.forEach(floor => {
    floorElements[floor.name] = document.querySelector(`.${floor.name}`);
  });
});

const lowestFloor: number = -1;
const highestFloor: number = 7;
const currentFloor = ref<number>(0);
const destinationFloor = ref<number>(0);
const direction = ref<string>("");
const elevatorOrders = ref<elevatorOrder[]>([]);
let interval: number;

watch(currentFloor, (newValue) => {
  if (newValue === highestFloor || newValue === lowestFloor) {
    clearInterval(interval);
  }
});

watch(currentFloor, (_) => {
  if (destinationFloor.value === currentFloor.value) {
    clearInterval(interval);
  }
});

const changeFloorVisibility = (current: number, next: number) => {
  const currentFloorName = floors.find(floor => floor.value === current)?.name;
  const nextFloorName = floors.find(floor => floor.value === next)?.name;
  if (currentFloorName) floorElements[currentFloorName]?.classList.add('hidden');
  if (nextFloorName) floorElements[nextFloorName]?.classList.remove('hidden');
};

const moveElevator = (step: number) => {
  interval = setInterval(() => {
    const newFloor = currentFloor.value + step;
    if (newFloor >= lowestFloor && newFloor <= highestFloor) {
      changeFloorVisibility(currentFloor.value, newFloor);
      currentFloor.value = newFloor;
      console.log(currentFloor.value);
    }
  }, 500);
};

const upHandler = (): void => {
  direction.value = "up";
  clearInterval(interval);
  moveElevator(1);
};

const downHandler = (): void => {
  direction.value = "down";
  clearInterval(interval);
  moveElevator(-1);
};

const callHandler = (floor: number): void => {
  const elevatorOrder: elevatorOrder = {
    id: Date.now().toString(),
    direction: currentFloor.value < floor ? "up" : "down",
    destinationFloor: floor
  };
  elevatorOrders.value.push(elevatorOrder);
  executor();
};

const executor = async () => {
  while (elevatorOrders.value.length > 0) {
    const currentOrder = elevatorOrders.value[0];
    destinationFloor.value = currentOrder.destinationFloor;

    if (currentFloor.value < destinationFloor.value) {
      upHandler();
    } else if (currentFloor.value > destinationFloor.value) {
      downHandler();
    }

    await new Promise<void>((resolve) => {
      const unwatch = watch(currentFloor, (newValue) => {
        if (newValue === destinationFloor.value) {
          clearInterval(interval);
          unwatch();
          resolve();
        }
      });
    });

    elevatorOrders.value = elevatorOrders.value.filter(order => order.id !== currentOrder.id);
  }
};

</script>


<template>
  <div class="container">
    {{ elevatorOrders }}
    <div class="flex">
      <div
        class="relative z-100 flex justify-center items-center border-4 border-gray-950 border-b-0 w-32 h-32 text-6xl">7
        <div class="absolute inset-0 flex justify-center items-center hidden bg-purple-800 text-6xl text-white seventh">
          7</div>
      </div>
      <button class="bg-gray-400 my-auto p-2 border h-12" @click="callHandler(7)">Call</button>
    </div>
    <div class="flex">
      <div class="relative z-9 flex justify-center items-center border-4 border-gray-950 border-b-0 w-32 h-32 text-6xl">
        6
        <div class="absolute inset-0 flex justify-center items-center hidden bg-purple-800 text-6xl text-white sixth">
          6</div>
      </div>
      <button class="bg-gray-400 my-auto p-2 border h-12" @click="callHandler(6)">Call</button>
    </div>
    <div class="flex">
      <div class="relative z-8 flex justify-center items-center border-4 border-gray-950 border-b-0 w-32 h-32 text-6xl">
        5
        <div class="absolute inset-0 flex justify-center items-center hidden bg-purple-800 text-6xl text-white fifth">
          5</div>
      </div>
      <button class="bg-gray-400 my-auto p-2 border h-12" @click="callHandler(5)">Call</button>
    </div>
    <div class="flex">
      <div class="relative z-7 flex justify-center items-center border-4 border-gray-950 border-b-0 w-32 h-32 text-6xl">
        4
        <div class="absolute inset-0 flex justify-center items-center hidden bg-purple-800 text-6xl text-white fourth">
          4</div>
      </div>
      <button class="bg-gray-400 my-auto p-2 border h-12" @click="callHandler(4)">Call</button>
    </div>
    <div class="flex">
      <div class="relative z-6 flex justify-center items-center border-4 border-gray-950 border-b-0 w-32 h-32 text-6xl">
        3
        <div class="absolute inset-0 flex justify-center items-center hidden bg-purple-800 text-6xl text-white third">
          3</div>
      </div>
      <button class="bg-gray-400 my-auto p-2 border h-12" @click="callHandler(3)">Call</button>
    </div>
    <div class="flex">
      <div class="relative z-5 flex justify-center items-center border-4 border-gray-950 border-b-0 w-32 h-32 text-6xl">
        2
        <div class="absolute inset-0 flex justify-center items-center hidden bg-purple-800 text-6xl text-white second">
          2</div>
      </div>
      <button class="bg-gray-400 my-auto p-2 border h-12" @click="callHandler(2)">Call</button>
    </div>
    <div class="flex">
      <div class="relative z-4 flex justify-center items-center border-4 border-gray-950 border-b-0 w-32 h-32 text-6xl">
        1
        <div class="absolute inset-0 flex justify-center items-center hidden bg-purple-800 text-6xl text-white first">
          1</div>
      </div>
      <button class="bg-gray-400 my-auto p-2 border h-12" @click="callHandler(1)">Call</button>
    </div>
    <div class="flex">
      <div class="relative z-3 flex justify-center items-center border-4 border-gray-950 border-b-0 w-32 h-32 text-6xl">
        0
        <div class="absolute inset-0 flex justify-center items-center bg-purple-800 text-6xl text-white ground">0</div>
      </div>
      <button class="bg-gray-400 my-auto p-2 border h-12" @click="callHandler(0)">Call</button>
    </div>
    <div class="flex">
      <div class="relative z-2 flex justify-center items-center border-4 border-gray-950 w-32 h-32 text-6xl">-1
        <div
          class="absolute inset-0 flex justify-center items-center hidden bg-purple-800 text-6xl text-white basement">
          -1
        </div>
      </div>
      <button class="bg-gray-400 my-auto p-2 border h-12" @click="callHandler(-1)">Call</button>
    </div>
  </div>
</template>
