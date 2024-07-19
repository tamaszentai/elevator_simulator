export interface elevatorOrder {
  id: string
  direction: string
  destinationFloor: number
  type: ElevatorOrderType
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

export enum Status {
  IDLE = 'IDLE',
  OPENING = 'OPENING',
  OPENED = 'OPENED',
  CLOSING = 'CLOSING',
  CLOSED = 'CLOSED',
  MOVING = 'MOVING'
}

export enum ElevatorOrderType {
  INSIDE = 'INSIDE',
  OUTSIDE = 'OUTSIDE'
}
