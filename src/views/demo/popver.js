class Popver {
  create() {
    const popver = document.createElement('div')
    popver.addEventListener('click', e => e.stopPropagation(), false)

    const style = popver.style
    style.border = '1px solid #EBEEF5'
    style.boxShadow = '0 2px 12px 0 rgb(0 0 0 / 10%)'
    style.padding = '12px'
    style.backgroundColor = '#fff'
    style.display = 'none'
    style.position = 'absolute'
    style.top = 0
    style.left = 0

    const preview = document.createElement('a')
    preview.href = '#'
    preview.text = 'Preview'
    preview.style.marginRight = '10px'
    popver.appendChild(preview)

    const download = document.createElement('a')
    download.href = `#`
    download.text = 'Download'
    popver.appendChild(download)

    document.body.appendChild(popver)
    document.body.addEventListener('click', _ => {
      console.debug('body click', arguments)
      popver.style.display = 'none'
    }, false)

    this.elem = popver
  }

  show(plink, dlink) {
    const event = window.event
    event.stopPropagation()

    !this.elem && this.create()

    const style = this.elem.style
    style.display = 'block'
    style.top = `${event.clientY + event.offsetY}px`
    style.left = `${event.clientX}px`

    this.elem.childNodes.forEach((it, ind) => (it.href = ind ? dlink : plink))
  }
}

export default new Popver()
