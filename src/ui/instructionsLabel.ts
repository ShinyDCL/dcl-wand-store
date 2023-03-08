export class InstructionsLabel {
  backgroundImage: UIImage;
  text: UIText;

  constructor(canvas: UICanvas, texture: Texture, message: string) {
    const image = new UIImage(canvas, texture);
    image.hAlign = 'center';
    image.vAlign = 'bottom';
    image.positionY = -25;
    image.width = 256;
    image.height = 32;
    image.opacity = 0.9;
    image.visible = false;
    image.sourceWidth = 256;
    image.sourceHeight = 64;
    image.sourceLeft = 0;
    image.sourceTop = 0;
    this.backgroundImage = image;

    const text = new UIText(image);
    text.hTextAlign = 'center';
    text.vTextAlign = 'center';
    text.fontSize = 13;
    text.visible = false;
    text.value = message;
    text.isPointerBlocker = false;
    this.text = text;
  }

  hide() {
    this.backgroundImage.visible = false;
    this.text.visible = false;
  }

  show() {
    this.backgroundImage.visible = true;
    this.text.visible = true;
  }
}
