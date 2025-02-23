import { Samples } from "./samples";

function sfc32(a: number, b: number, c: number, d: number) {
  return function () {
    a |= 0;
    b |= 0;
    c |= 0;
    d |= 0;
    const t = (((a + b) | 0) + d) | 0;
    d = (d + 1) | 0;
    a = b ^ (b >>> 9);
    b = (c + (c << 3)) | 0;
    c = (c << 21) | (c >>> 11);
    c = (c + t) | 0;
    return (t >>> 0) / 4294967296;
  };
}

function getRandomInt(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export class Experiment {
  sampleId: number;
  cBomb: number;
  tRoom: number;
  sampleWgt: number;
  itWater: number;
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

  rand: any;

  csv_output = "";
  res_output = "";

  g_X: Array<number>;
  g_Y: Array<number>;

  constructor(
    sampleId: number,
    seed_a: number = getRandomInt(0, 10),
    seed_b: number = getRandomInt(0, 10),
    seed_c: number = getRandomInt(0, 10),
    seed_d: number = getRandomInt(0, 10)
  ) {
    // console.log("Using seed", seed_a, seed_b, seed_c, seed_d);
    this.rand = sfc32(seed_a, seed_b, seed_c, seed_d);
    for (let i = 0; i < 100; i++) {
      this.rand();
    }

    // v1 - __header.htm
    this.sampleId = sampleId;
    this.cBomb = 1182 + 600 * this.rand();
    this.tRoom = 22 + 3.8 * Math.random();
    this.sampleWgt = Math.round(9000 + 2000 * Math.random()) / 10000;
    this.tWater = 24 + 0.1 * Math.round(0.5 + 4 * Math.random());
    this.itWater = this.tWater;

    // v1 - exp.htm
    this.cContents = 50;
    this.cParts = 150;
    this.cWater = 8368 + 8 * this.rand();
    this.cRig = this.cWater + this.cParts;
    this.cTotal = this.cBomb + this.cContents + this.cWater + this.cParts;
    // console.log("SEARCH ME cBomb: " + this.cBomb);
    // console.log("SEARCH ME cWater: " + this.cWater);
    // console.log("SEARCH ME cTotal: " + this.cTotal);
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

  experiment(addedOxygen: boolean, addedWater: boolean) {
    this.tWater = Number(this.itWater);

    let i = 1;

    // this.wireLoss += (20 - 40 * Math.random()) / 10000;
    let trw = 0;
    let tbg = 0;
    let twb = 0;

    // Rewriting simulation in order to make it cleaner and have constant dt
    const p_dt = 10; // Plotting frequency proportion to simulation frequency
    const s_dt = 0.05; // Simulation frequency

    let counter = 0; // Number of points simulated
    let sim_time = 0; // Simulation time

    const noise_level = 0.02; // Noise level of temperature

    if (addedOxygen && addedWater) {
      this.times[0] = 0;
      this.temps[0] = this.tWater;

      // Before ignition
      for (i = 0; i < 100; i++) {
        // Compute diffs
        trw = this.tRoom - this.tWater;

        this.tWater += (s_dt * this.kWater * trw) / this.cTotal;
        this.tWater += 0.001 - 0.002 * Math.random();

        counter += 1;
        sim_time += s_dt;
        if (counter % p_dt == 0) {
          this.times.push(sim_time);
          this.temps.push(
            this.tWater + noise_level - 2 * noise_level * Math.random()
          );
        }
      }

      // Ignition
      let tBomb = this.tWater;
      let tGas =
        this.tWater +
        (this.sampleWgt * Number(Samples[this.sampleId].sE) +
          5858 * this.wireLoss) /
          this.cContents;

      for (i = 0; i < 120; i++) {
        // Compute diffs
        tbg = tBomb - tGas;
        twb = this.tWater - tBomb;
        trw = this.tRoom - this.tWater;

        tGas += (s_dt * this.kGas * tbg) / this.cContents;
        tBomb += ((this.kGas * -tbg + this.kBomb * twb) * s_dt) / this.cBomb;
        this.tWater +=
          ((this.kBomb * -twb + this.kWater * trw) * s_dt) / this.cRig;

        counter += 1;
        sim_time += s_dt;
        if (counter % p_dt == 0) {
          this.times.push(sim_time);
          this.temps.push(
            this.tWater + noise_level - 2 * noise_level * Math.random()
          );
        }
      }

      // After ignition
      for (i = 0; i < 100; i++) {
        // Compute diffs
        trw = this.tRoom - this.tWater;

        this.tWater += (s_dt * this.kWater * trw) / this.cTotal;
        this.tWater += 0.001 - 0.002 * Math.random();

        counter += 1;
        sim_time += s_dt;
        if (counter % p_dt == 0) {
          this.times.push(sim_time);
          this.temps.push(
            this.tWater + noise_level - 2 * noise_level * Math.random()
          );
        }
      }
    } else if (addedWater) {
      this.times[0] = 0;
      this.temps[0] = this.tWater;

      for (i = 0; i < 320; i++) {
        // Compute diffs
        trw = this.tRoom - this.tWater;

        this.tWater += (s_dt * this.kWater * trw) / this.cTotal;
        this.tWater += 0.001 - 0.002 * Math.random();

        counter += 1;
        sim_time += s_dt;
        if (counter % p_dt == 0) {
          this.times.push(sim_time);
          this.temps.push(
            this.tWater + noise_level - 2 * noise_level * Math.random()
          );
        }
      }
    } else {
      this.times[0] = 0;
      this.temps[0] = this.tRoom;

      for (i = 0; i < 320; i++) {
        this.tWater = this.tRoom;

        counter += 1;
        sim_time += s_dt;
        if (counter % p_dt == 0) {
          this.times.push(sim_time);
          this.temps.push(
            this.tWater + noise_level - 2 * noise_level * Math.random()
          );
        }
      }
    }

    this.g_X = this.times;
    this.g_Y = this.temps;

    // for (counter == 1; counter < 6; counter++) {
    //   // Compute diffs
    //   trw = this.tRoom - this.tWater;

    //   this.tWater += (20 * dt * this.kWater * trw) / this.cTotal;
    //   this.tWater += 0.001 - 0.002 * Math.random();

    //   this.times[counter] = counter;
    //   this.temps[counter] = this.tWater + 0.002 - 0.004 * Math.random();

    //   // PLOTS THESE POINTS (p1 => p5)
    //   this.g_X.push(counter - 1);
    //   this.g_Y.push(this.temps[counter]);
    // }

    // counter = 5;
    // i = 101;
    // for (i == 101; i < 105; i++) {
    //   // Compute diffs
    //   trw = this.tRoom - this.tWater;

    //   this.tWater += (dt * this.kWater * trw) / this.cTotal;
    //   this.tWater += 0.001 - 0.002 * Math.random();

    //   // PLOTS THESE POINTS (p101 => p104)
    //   this.g_X.push(i / 20);
    //   this.g_Y.push(this.tWater);
    // }

    // let tBomb = this.tWater;
    // let tGas =
    //   this.tWater +
    //   (this.sampleWgt * Number(Samples[this.sampleId].sE) +
    //     5858 * this.wireLoss) /
    //     this.cContents;
    // // console.log(
    // //   "SEARCH ME tGas: " +
    // //     (this.sampleWgt * Number(Samples[this.sampleId].sE) +
    // //       5858 * this.wireLoss)
    // // );

    // i = 105;
    // for (i == 105; i < 201; i++) {
    //   // Compute diffs
    //   tbg = tBomb - tGas;
    //   twb = this.tWater - tBomb;
    //   trw = this.tRoom - this.tWater;

    //   if (i == 160) spacer = 20;
    //   tGas += (this.kGas * dt * tbg) / this.cContents;
    //   tBomb += ((this.kGas * -tbg + this.kBomb * twb) * dt) / this.cBomb;
    //   this.tWater += ((this.kBomb * -twb + this.kWater * trw) * dt) / this.cRig;

    //   // PLOTS THESE POINTS (p105 => p200)
    //   this.g_X.push(i / 20);
    //   this.g_Y.push(this.tWater);

    //   if (i % spacer == 0) {
    //     counter += 1;
    //     this.times[counter] = i / 20;
    //     this.temps[counter] = this.tWater + 0.002 - 0.004 * Math.random();
    //   }
    // }

    // i = 11;
    // for (i == 11; i < 19; i++) {
    //   // Compute diffs
    //   tbg = tBomb - tGas;
    //   twb = this.tWater - tBomb;
    //   trw = this.tRoom - this.tWater;

    //   tGas += (20 * this.kGas * dt * tbg) / this.cContents;
    //   tBomb += (20 * (this.kGas * -tbg + this.kBomb * twb) * dt) / this.cBomb;
    //   this.tWater +=
    //     (20 * (this.kBomb * -twb + this.kWater * trw) * dt) / this.cRig;

    //   // PLOTS THESE POINTS (p220 => p280)
    //   this.g_X.push(i);
    //   this.g_Y.push(this.tWater);

    //   counter += 1;
    //   this.times[counter] = i;
    //   this.temps[counter] = this.tWater + 0.002 - 0.004 * Math.random();
    // }

    // Output string
    let isay = "=====,=====\nTime (s),Temperature (C)\n";
    for (i = 0; i < this.times.length; i++) {
      isay +=
        (this.times[i] * 60).toFixed(2) + "," + this.temps[i].toFixed(2) + "\n";
      // dummy = Math.round(100 * this.times[i]).toString();
      // if (this.times[i] < 10) dummy = " " + dummy;
      // isay += " " + dummy.substring(0, 2) + "." + dummy.substring(2) + ",";
      // dummy = Math.round(1000 * this.temps[i]).toString();
      // isay += dummy.substring(0, 2) + "." + dummy.substring(2) + "\n";
    }
    this.csv_output = isay;

    isay = "Time (m)\tTemp (°C)\n====================\n";
    for (i = 0; i < this.times.length; i++) {
      isay +=
        this.times[i].toFixed(2) + "\t\t" + this.temps[i].toFixed(2) + "\n";

      // dummy = Math.round(100 * this.times[i]).toString();
      // if (i === 0) dummy = "000";
      // if (this.times[i] < 10) dummy = " " + dummy;
      // isay += " " + dummy.substring(0, 2) + "." + dummy.substring(2) + "      ";
      // dummy = Math.round(1000 * this.temps[i]).toString();
      // isay += dummy.substring(0, 2) + "." + dummy.substring(2) + "\n";
    }
    this.res_output = isay;

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
