import { Samples } from "./samples";

export class Experiment {
  sampleId: number;
  cBomb: number;
  tRoom: number;
  sampleWgt: number;
  tWater: number;
  cContents: number;
  cParts: number;
  cWater: number;
  cRig: number;
  cTotal: number;
  wireWgt: number;
  wireLoss: number;
  wireAfter: number;
  kBomb: number;
  kGas: number;
  kWater: number;
  times: Array<number>;
  temps: Array<number>;

  output = "";

  g_X: Array<number>;
  g_Y: Array<number>;

  constructor(sampleId: number) {
    // v1 - __header.htm
    this.sampleId = sampleId;
    this.cBomb = 1182 + 600 * Math.random();
    this.tRoom = 22 + 3.8 * Math.random();
    this.sampleWgt = Math.round(9000 + 2000 * Math.random()) / 10000;
    this.tWater = 24 + 0.1 * Math.round(0.5 + 4 * Math.random());

    // v1 - exp.htm
    this.cContents = 50;
    this.cParts = 150;
    this.cWater = 8368 + 8 * Math.random();
    this.cRig = this.cWater + this.cParts;
    this.cTotal = this.cBomb + this.cContents + this.cWater + this.cParts;
    this.wireWgt = (200 + 100 * Math.random()) / 10000;
    this.wireLoss = (19.99 + 80 * Math.random()) / 10000;
    this.wireAfter = this.wireWgt - this.wireLoss;
    this.kBomb = 1500;
    this.kGas = 100;
    this.kWater = 12;

    // storage for student output
    this.times = [];
    this.temps = [];

    // graph output
    this.g_X = [];
    this.g_Y = [];
  }

  experiment() {
    const dt = 0.05;
    let i = 1;
    let counter = 1;
    let spacer = 5;

    this.wireLoss += (20 - 40 * Math.random()) / 10000;

    this.times[0] = 0;

    this.temps[0] = this.tWater;

    for (counter == 1; counter < 6; counter++) {
      this.tWater +=
        (20 * dt * this.kWater * (this.tRoom - this.tWater)) / this.cTotal;
      this.tWater += 0.001 - 0.002 * Math.random();

      this.times[counter] = counter;
      this.temps[counter] = this.tWater + 0.002 - 0.004 * Math.random();

      // PLOTS THESE POINTS (p1 => p5)
      this.g_X.push(counter - 1);
      this.g_Y.push(this.tWater);
    }

    counter = 5;
    i = 101;
    for (i == 101; i < 105; i++) {
      this.tWater +=
        (dt * this.kWater * (this.tRoom - this.tWater)) / this.cTotal;
      this.tWater += 0.001 - 0.002 * Math.random();

      // PLOTS THESE POINTS (p101 => p104)
      this.g_X.push(i / 20);
      this.g_Y.push(this.tWater);
    }

    let tBomb = this.tWater;
    let tGas =
      this.tWater +
      (this.sampleWgt * Number(Samples[this.sampleId].sE) +
        5858 * this.wireLoss) /
        this.cContents;

    i = 105;
    for (i == 105; i < 201; i++) {
      if (i == 160) spacer = 20;
      tGas += (this.kGas * dt * (tBomb - tGas)) / this.cContents;
      tBomb +=
        ((this.kGas * (tGas - tBomb) + this.kBomb * (this.tWater - tBomb)) *
          dt) /
        this.cBomb;
      this.tWater +=
        ((this.kBomb * (tBomb - this.tWater) +
          this.kWater * (this.tRoom - this.tWater)) *
          dt) /
        this.cRig;

      // PLOTS THESE POINTS (p105 => p200)
      this.g_X.push(i / 20);
      this.g_Y.push(this.tWater);

      if (i % spacer == 0) {
        counter += 1;
        this.times[counter] = i / 20;
        this.temps[counter] = this.tWater + 0.002 - 0.004 * Math.random();
      }
    }

    i = 11;
    for (i == 11; i < 19; i++) {
      tGas += (20 * this.kGas * dt * (tBomb - tGas)) / this.cContents;
      tBomb +=
        (20 *
          (this.kGas * (tGas - tBomb) + this.kBomb * (this.tWater - tBomb)) *
          dt) /
        this.cBomb;
      this.tWater +=
        (20 *
          (this.kBomb * (tBomb - this.tWater) +
            this.kWater * (this.tRoom - this.tWater)) *
          dt) /
        this.cRig;

      // PLOTS THESE POINTS (p220 => p280)
      this.g_X.push(i);
      this.g_Y.push(this.tWater);

      counter += 1;
      this.times[counter] = i;
      this.temps[counter] = this.tWater + 0.002 - 0.004 * Math.random();
    }

    // Output string
    i = 1;
    let isay = "  time       temp\n==============\n";
    let dummy = "";
    for (i == 1; i <= counter; i++) {
      dummy = Math.round(100 * this.times[i]).toString();
      if (this.times[i] < 10) dummy = " " + dummy;
      isay += " " + dummy.substring(0, 2) + "." + dummy.substring(2) + "      ";
      dummy = Math.round(1000 * this.temps[i]).toString();
      isay += dummy.substring(0, 2) + "." + dummy.substring(2) + "\n";
    }
    this.output = isay;

    return this.compute();
  }

  compute() {
    let x = 0;
    let y = 0;
    let sx = 0;
    let sy = 0;
    let sxx = 0;
    let syy = 0;
    let sxy = 0;
    let NN = 0;
    let denom = 0;
    let i = 0;

    for (i == 1; i < 6; i++) {
      x = 1 * this.times[i];
      y = 1 * this.temps[i];
      sx += x;
      sy += y;
      sxx += x * x;
      syy += y * y;
      sxy += x * y;
      NN += 1;
    }
    denom = NN * sxx - sx * sx;
    const aslope = (NN * sxy - sx * sy) / denom;
    const aint = (sy * sxx - sx * sxy) / denom;
    const adev = Math.sqrt(
      Math.abs((syy - aslope * sxy - aint * sy) / (NN - 2))
    );
    i = 22;
    sx = 0;
    sy = 0;
    sxx = 0;
    syy = 0;
    sxy = 0;
    NN = 0;

    for (i == 22; i < 28; i++) {
      x = 1 * this.times[i];
      y = 1 * this.temps[i];
      sx += x;
      sy += y;
      sxx += x * x;
      syy += y * y;
      sxy += x * y;
      NN += 1;
    }
    denom = NN * sxx - sx * sx;
    const bslope = (NN * sxy - sx * sy) / denom;
    const bint = (sy * sxx - sx * sxy) / denom;
    const bdev = Math.sqrt(
      Math.abs((syy - bslope * sxy - bint * sy) / (NN - 2))
    );

    return {
      aslope: aslope,
      aint: aint,
      adev: adev,
      bslope: bslope,
      bint: bint,
      bdev: bdev,
    };
  }
}
