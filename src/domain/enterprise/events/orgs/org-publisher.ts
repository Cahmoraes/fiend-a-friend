/* eslint-disable no-use-before-define */
import ExtendedSet from '@cahmoraes93/extended-set'
import { OrgCreated } from './org-created'
import { Observer } from '../observer'

export class OrgPublisher {
  private static _instance: OrgPublisher
  private subscribers = new ExtendedSet<Observer<OrgCreated>>()

  private constructor() {}

  public static instance() {
    if (!this._instance) {
      this._instance = new OrgPublisher()
    }
    return this._instance
  }

  public subscribe(callback: Observer<OrgCreated>) {
    this.subscribers.add(callback)
  }

  public notify(anOrgCreated: OrgCreated) {
    this.subscribers.forEach((observer) => observer.update(anOrgCreated))
  }

  public unsubscribe(callback: Observer<OrgCreated>) {
    this.subscribers.delete(callback)
  }
}
