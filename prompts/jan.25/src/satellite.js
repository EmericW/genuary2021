export default function Satellite(position) {
  this.bodyWidth = Math.floor(random(30, 50));
  this.bodyHeight = random(this.bodyWidth, this.bodyWidth + 30);
  this.halfBodyWidth = this.bodyWidth / 2;
  this.halfBodyHeight = this.bodyHeight / 2;
  this.bodyBorderRadius = Math.floor(random(0, this.bodyHeight));
  this.position = {
    x: position.x - this.halfBodyWidth,
    y: position.y - this.halfBodyHeight,
  };

  this.drawBody = () => {
    rect(
      this.position.x,
      this.position.y,
      this.bodyWidth,
      this.bodyHeight,
      this.bodyBorderRadius,
      this.bodyBorderRadius,
    );

    // body texture
    if (Math.random() > 0.5) {
      line(
        this.position.x,
        this.position.y + this.halfBodyHeight,
        this.position.x + this.bodyWidth,
        this.position.y + this.halfBodyHeight,
      );
      line(
        this.position.x,
        this.position.y + this.halfBodyHeight - 5,
        this.position.x + this.bodyWidth,
        this.position.y + this.halfBodyHeight - 5,
      );
      line(
        this.position.x,
        this.position.y + this.halfBodyHeight + 5,
        this.position.x + this.bodyWidth,
        this.position.y + this.halfBodyHeight + 5,
      );
    }
  };

  this.drawSolarPanels = () => {
    const panelStrudLength = 8;
    const panelHeight = random(20, 40);
    const panelWidth = Math.floor(random(30, 50));
    const halfPanelHeight = panelHeight / 2;
    const numberOfVerticalPanelGridLines = 3;
    const verticalPanelGridLineDistance =
      panelWidth / (numberOfVerticalPanelGridLines + 1);
    const panelRadius = Math.floor(random(0, 5));

    // right strud
    line(
      this.position.x + this.bodyWidth,
      this.position.y + this.halfBodyHeight,
      this.position.x + this.bodyWidth + panelStrudLength,
      this.position.y + this.halfBodyHeight,
    );

    // right panel
    rect(
      this.position.x + this.bodyWidth + panelStrudLength,
      this.position.y + this.halfBodyHeight - halfPanelHeight,
      panelWidth,
      panelHeight,
      panelRadius,
      panelRadius,
    );

    // right panel grid
    line(
      this.position.x + this.bodyWidth + panelStrudLength,
      this.position.y + this.halfBodyHeight,
      this.position.x + this.bodyWidth + panelStrudLength + panelWidth,
      this.position.y + this.halfBodyHeight,
    );

    for (let i = 1; i <= numberOfVerticalPanelGridLines; i += 1) {
      line(
        this.position.x +
          this.bodyWidth +
          panelStrudLength +
          verticalPanelGridLineDistance * i,
        this.position.y + this.halfBodyHeight - halfPanelHeight,
        this.position.x +
          this.bodyWidth +
          panelStrudLength +
          verticalPanelGridLineDistance * i,
        this.position.y + this.halfBodyHeight + halfPanelHeight,
      );
    }

    // left strud
    line(
      this.position.x,
      this.position.y + this.halfBodyHeight,
      this.position.x - panelStrudLength,
      this.position.y + this.halfBodyHeight,
    );

    // left panel
    rect(
      this.position.x - panelStrudLength - panelWidth,
      this.position.y + this.halfBodyHeight - halfPanelHeight,
      panelWidth,
      panelHeight,
      panelRadius,
      panelRadius,
    );

    // left panel grid
    line(
      this.position.x - panelStrudLength,
      this.position.y + this.halfBodyHeight,
      this.position.x - panelStrudLength - panelWidth,
      this.position.y + this.halfBodyHeight,
    );

    for (let i = 1; i <= numberOfVerticalPanelGridLines; i += 1) {
      line(
        this.position.x - panelStrudLength - verticalPanelGridLineDistance * i,
        this.position.y + this.halfBodyHeight - halfPanelHeight,
        this.position.x - panelStrudLength - verticalPanelGridLineDistance * i,
        this.position.y + this.halfBodyHeight + halfPanelHeight,
      );
    }
  };

  this.drawAntennaType1 = () => {
    const dishWidth = random(14, this.bodyWidth - 10);
    const halfDishWidth = Math.floor(dishWidth / 2);
    const dishHeight = Math.floor(random(5, 8));
    const strudLength = 5;

    // strud
    line(
      this.position.x + this.halfBodyWidth,
      -this.halfBodyHeight,
      this.position.x + this.halfBodyWidth,
      -this.halfBodyHeight - strudLength,
    );

    // dish
    beginShape();
    curveVertex(
      this.position.x + this.halfBodyWidth - halfDishWidth,
      -this.halfBodyHeight - dishHeight - strudLength,
    );
    curveVertex(
      this.position.x + this.halfBodyWidth - halfDishWidth,
      -this.halfBodyHeight - dishHeight - strudLength,
    );
    curveVertex(
      this.position.x + this.halfBodyWidth - 5,
      -this.halfBodyHeight - strudLength,
    );
    curveVertex(
      this.position.x + this.halfBodyWidth + 5,
      -this.halfBodyHeight - strudLength,
    );
    curveVertex(
      this.position.x + this.halfBodyWidth + halfDishWidth,
      -this.halfBodyHeight - dishHeight - strudLength,
    );
    curveVertex(
      this.position.x + this.halfBodyWidth + halfDishWidth,
      -this.halfBodyHeight - dishHeight - strudLength,
    );
    endShape();

    line(
      this.position.x + this.halfBodyWidth - halfDishWidth,
      -this.halfBodyHeight - dishHeight - strudLength,
      this.position.x + this.halfBodyWidth + halfDishWidth,
      -this.halfBodyHeight - dishHeight - strudLength,
    );

    arc(
      this.position.x + this.halfBodyWidth,
      -this.halfBodyHeight - dishHeight - strudLength,
      6,
      6,
      PI,
      TWO_PI,
    );
  };

  this.drawAntennaType2 = () => {
    const length = Math.floor(random(15, 20));

    // strud
    line(
      this.position.x + this.halfBodyWidth,
      -this.halfBodyHeight,
      this.position.x + this.halfBodyWidth,
      -this.halfBodyHeight - length,
    );

    circle(
      this.position.x + this.halfBodyWidth,
      -this.halfBodyHeight - length - 4,
      8,
    );
  };

  this.draw = () => {
    this.drawBody();
    this.drawSolarPanels();

    if (Math.random() > 0.5) {
      this.drawAntennaType1();
    } else {
      this.drawAntennaType2();
    }
  };
}
