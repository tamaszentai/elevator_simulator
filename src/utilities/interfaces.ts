export interface elevatorOrder {
  id: string
  direction: string
  destinationFloor: number
}

export interface floor {
  name: string
  value: number
}

export interface floorProps {
  floor: floor
  currentFloor: number
  destinationFloor: number
  elevatorOrders: elevatorOrder[]
}
