
         ▄█ ▀█████████▄   ▄██████▄   ▄██████▄
        ███   ███    ███ ███    ███ ███    ███
        ███   ███    ███ ███    ███ ███    ███
        ███  ▄███▄▄▄██▀  ███    ███ ███    ███
        ███ ▀▀███▀▀▀██▄  ███    ███ ███    ███
        ███   ███    ██▄ ███    ███ ███    ███
        ███   ███    ███ ███    ███ ███    ███
    █▄ ▄███ ▄█████████▀   ▀██████▀   ▀██████▀
    ▀▀▀▀▀▀
  -----------------------------------------------
    jQuery Basic Object Orientation



Classes:

    - Class()
      - initialize(function)
      - setOptions(options)
      
    - Element(tagName[, options])
      - html: '',
      - text: ''
      - styles: {}
      - events: {}
    
    
    
Prototype extensions:

    - Element.inject(element[, where]) # where can be 'top' or 'bottom'

    - Element.adopt(element1[, element2, element3, ...])

    - Element.getElement(selector)

    - Element.setStyle(style, value)

    - Element.getStyles({ style1: value1[, style2: value2, ...] })

    - Element.fx({
          styles: { style1: value1[, style2: value2, ...] },
          duration: 150,
          onComplete: function(){}
      })

    - Element.blink()

    - Element.getSize()

