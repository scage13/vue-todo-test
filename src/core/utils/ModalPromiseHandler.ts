export class ModalPromiseHandler {
  public isShow = false
  private payload = false

  async init (): Promise<boolean | undefined> {
    this.isShow = true
    return new Promise((resolve) => {
      const interval = setInterval(() => {
        if (this.isShow) return

        clearInterval(interval)
        resolve(this.payload)
      })
    })
  }

  setData (payload: boolean) {
    this.payload = payload
  }
}
