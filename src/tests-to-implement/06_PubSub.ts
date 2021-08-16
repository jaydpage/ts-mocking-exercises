import { randomInteger } from "../tests-implemented/helpers/random"

type Callback = (...params: any[]) => any

export enum PubSubChannels {
  itemUpdated = 'item:updated',
}

export class PubSub {
  private static instance: PubSub
  private subscriptions: Record<string, Callback[]>

  static getInstance() {
    if (!this.instance) {
      this.instance = new PubSub()
    }
    return this.instance
  }

  constructor() {
    this.subscriptions = {} as Record<string, Callback[]>
  }

  async publish(channel: string, payload: unknown) {
    console.log(`publishing ${JSON.stringify(payload)} on ${channel}`)

    if (!this.subscriptions[channel])
      return;

    for (const callback of this.subscriptions[channel]) {
      setTimeout(() => {
        callback(payload)
      }, randomInteger(100, 500))
    }
  }

  async subscribe(channel: string, callback: Callback) {
    console.log(`subscribing to ${channel}`)

    this.subscriptions[channel] = [
      ...(this.subscriptions[channel] || []),
      callback,
    ]
  }
}
