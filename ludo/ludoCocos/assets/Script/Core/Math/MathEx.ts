/** 格子检测范围 */
export const GRID_TEXTURE_CHEK_RANGE = 3;

export class Plane {
  public p: cc.Vec3; // 平面的起点
  public n: cc.Vec3; // 平面的法向量
}

export default class MathEx {
  public static PI = 3.1415926;
  public static angle2Radian(angle: number): number {
    return ((this.PI * angle) % 360) / 180;
  }

  public static radian2Angle(radian: number): number {
    return (radian * 180) / this.PI;
  }

  public static angleByPos(
    c1: number | cc.Vec2,
    c2: number | cc.Vec2,
    c3?: number,
    c4?: number
  ) {
    if (c1 instanceof cc.Vec2 && c2 instanceof cc.Vec2) {
      let p = new cc.Vec2();
      p.x = c2.x - c1.y;
      p.y = c2.y - c1.y;
      return (Math.atan2(p.y, p.x) * 180) / this.PI;
    } else if (typeof c1 == "number" && typeof c2 == "number") {
      let p = new cc.Vec2();
      p.x = c3 - c1;
      p.y = c4 - c2;
      return (Math.atan2(p.y, p.x) * 180) / this.PI;
    }
    return 0;
  }

  public static pLineIntersect(
    A: cc.Vec2,
    B: cc.Vec2,
    C: cc.Vec2,
    D: cc.Vec2,
    retP: cc.Vec2
  ): boolean {
    if ((A.x === B.x && A.y === B.y) || (C.x === D.x && C.y === D.y)) {
      return false;
    }
    var BAx = B.x - A.x;
    var BAy = B.y - A.y;
    var DCx = D.x - C.x;
    var DCy = D.y - C.y;
    var ACx = A.x - C.x;
    var ACy = A.y - C.y;

    var denom = DCy * BAx - DCx * BAy;

    retP.x = DCx * ACy - DCy * ACx;
    retP.y = BAx * ACy - BAy * ACx;

    if (denom === 0) {
      if (retP.x === 0 || retP.y === 0) {
        // Lines incident
        return true;
      }
      // Lines parallel and not incident
      return false;
    }

    retP.x = retP.x / denom;
    retP.y = retP.y / denom;

    return true;
  }

  public static pSegmentIntersect(
    A: cc.Vec2,
    B: cc.Vec2,
    C: cc.Vec2,
    D: cc.Vec2
  ): boolean {
    var retP = cc.v2(0, 0);
    if (this.pLineIntersect(A, B, C, D, retP))
      if (retP.x >= 0.0 && retP.x <= 1.0 && retP.y >= 0.0 && retP.y <= 1.0)
        return true;
    return false;
  }

  public static segmentIntersectRect(
    ps: cc.Vec2,
    pe: cc.Vec2,
    r: cc.Rect
  ): boolean {
    // 先判断是否包含
    if (r.contains(ps) && r.contains(pe)) return true;
    return (
      this.pSegmentIntersect(
        ps,
        pe,
        cc.v2(r.xMin, r.yMin),
        cc.v2(r.xMin, r.yMax)
      ) ||
      this.pSegmentIntersect(
        ps,
        pe,
        cc.v2(r.xMin, r.yMin),
        cc.v2(r.xMax, r.yMin)
      ) ||
      this.pSegmentIntersect(
        ps,
        pe,
        cc.v2(r.xMin, r.yMax),
        cc.v2(r.xMax, r.yMax)
      ) ||
      this.pSegmentIntersect(
        ps,
        pe,
        cc.v2(r.xMax, r.yMax),
        cc.v2(r.xMax, r.yMin)
      )
    );
  }

  /**
   * 获取起点和终点经过的以单位大小（1，1）组成网格的格子集合
   * @param ps 起点
   * @param pe 终点
   */
  public static segmentArounds(ps: cc.Vec2, pe: cc.Vec2): cc.Vec2[] {
    let coords: cc.Vec2[] = [];

    // 竖
    if (ps.x == pe.x) {
      let dis = pe.y - ps.y;
      let absDis = Math.abs(dis);
      for (let i = 1; i <= absDis; i++) {
        coords.push(cc.v2(ps.x, ps.y + (dis / absDis) * i));
      }
      return coords;
    }
    // 横
    if (ps.y == pe.y) {
      let dis = pe.x - ps.x;
      let absDis = Math.abs(dis);
      for (let i = 1; i <= absDis; i++) {
        coords.push(cc.v2(ps.x + (dis / absDis) * i, ps.y));
      }
      return coords;
    }

    // 直线公式： y = kx + b; k 为斜率 = tan;
    let tan = (pe.y - ps.y) / (pe.x - ps.x);
    let b = ps.y - ps.x * tan;
    let absTan = Math.abs(tan);
    if (absTan > 0 && absTan <= 1) {
      // 说明x增量大于y增量， 以x遍历
      let iter = ps.x < pe.x ? 1 : -1;
      for (
        let x = ps.x;
        (iter > 0 && x <= pe.x) || (iter < 0 && x >= pe.x);
        x += iter
      ) {
        let y = Math.floor(tan * x + b);
        coords.push(cc.v2(x, y));
      }
    } else {
      let iter = ps.y < pe.y ? 1 : -1;
      for (
        let y = ps.y;
        (iter > 0 && y <= pe.y) || (iter < 0 && y >= pe.y);
        y += iter
      ) {
        let x = Math.floor((y - b) / tan);
        coords.push(cc.v2(x, y));
      }
    }
    return coords;
  }

  /**
   * 获取两点之间经过的坐标
   * @param c1
   * @param c2
   * @param c3
   * @param c4
   */
  public static getSegmentArounds(
    c1: cc.Vec2 | number,
    c2: cc.Vec2 | number,
    c3?: number,
    c4?: number
  ): cc.Vec2[] {
    if (c1 instanceof cc.Vec2 && c2 instanceof cc.Vec2) {
      return MathEx.segmentArounds(c1, c2);
    } else if (typeof c1 == "number" && typeof c2 == "number") {
      return MathEx.segmentArounds(cc.v2(c1, c2), cc.v2(c3, c4));
    }
    return null;
  }

  /**
   * 取俩点距离
   * @param c1
   * @param c2
   * @param c3
   * @param c4
   */
  public static getDistance(
    c1: number | cc.Vec2,
    c2: number | cc.Vec2,
    c3?: number,
    c4?: number
  ): number {
    if (typeof c1 != "number" && typeof c2 != "number") {
      return c1.sub(c2).mag();
    } else if (typeof c1 == "number" && typeof c2 == "number") {
      let xDis = c1 - c3,
        yDis = c2 - c4;
      let dis = Math.sqrt(xDis * xDis + yDis * yDis);
      return dis;
    }
    return -1;
  }

  /**
   * 求ab向量的夹角
   */
  public static getAngleAB(a: cc.Vec2, b: cc.Vec2): number {
    let vDis = b.sub(a);
    let fADis = a.mag(),
      fBDis = b.mag();
    let cosVal = vDis.dot(a) / (fADis * fBDis);
    let angle = (Math.acos(cosVal) * 180) / this.PI;
    return -angle;
  }

  /** 求AB点和x（水平面）轴的夹角 */
  public static getAngleX(a: cc.Vec2, b: cc.Vec2): number {
    var vDis = b.sub(a);
    var fDis = vDis.mag();
    var cosVal = vDis.dot(cc.Vec2.RIGHT) / fDis;
    let angle = (Math.acos(cosVal) * 180) / this.PI;
    if (vDis.x > 0 && vDis.y > 0) return angle;
    else if (vDis.x >= 0 && vDis.y <= 0) return -angle;
    else if (vDis.x <= 0 && vDis.y >= 0) return angle;
    else if (vDis.x <= 0 && vDis.y <= 0) return -angle;
    else return angle;
  }

  public static getAnglePos(angle: number, width: number) {
    let radian = cc.misc.degreesToRadians(angle);
    return cc.v2(Math.cos(radian) * width, Math.sin(radian) * width);
  }

  /**
   * 获取周围的八个格子
   * @param coord 坐标
   */
  public static getAroundCoords(
    coord: cc.Vec2 | number,
    y?: number
  ): cc.Vec2[] {
    let coords: cc.Vec2[] = [];
    if (coord instanceof cc.Vec2) {
      let startPos = cc.v2(coord.x - 1, coord.y - 1);
      for (let j = 0; j < GRID_TEXTURE_CHEK_RANGE; j++) {
        for (let i = 0; i < GRID_TEXTURE_CHEK_RANGE; i++) {
          let pos = cc.v2(startPos.x + i, startPos.y + j);
          if (pos.x == coord.x && pos.y == coord.y) continue;
          coords.push(pos);
        }
      }
    } else {
      let startPos = cc.v2(coord - 1, y - 1);
      for (let j = 0; j < GRID_TEXTURE_CHEK_RANGE; j++) {
        for (let i = 0; i < GRID_TEXTURE_CHEK_RANGE; i++) {
          let pos = cc.v2(startPos.x + i, startPos.y + j);
          if (pos.x == coord && pos.y == y) continue;
          coords.push(pos);
        }
      }
    }
    return coords;
  }

  /**
   * 获取以center为圆心的range为半径的地块坐标
   * @param center
   * @param range
   */
  public static getRangeCoords(
    center: cc.Vec2,
    range: number,
    size: cc.Size
  ): cc.Vec2[] {
    let coords: cc.Vec2[] = [];
    for (let j = -range; j <= range; j++) {
      for (let i = -range; i <= range; i++) {
        let air = cc.v2(center.x + i, center.y + j);
        if (
          air.x < 0 ||
          air.x >= size.width - 1 ||
          air.y < 0 ||
          air.y >= size.height
        )
          continue;
        let distance = Math.ceil(MathEx.getDistance(center, air));
        if (distance > range) continue;
        coords.push(air);
      }
    }
    return coords;
  }

  /**
   * 不规则多边形检测
   * @param testx
   * @param testy
   * @param verts
   */
  public static irregularCheck(
    testx: number,
    testy: number,
    verts: cc.Vec2[]
  ): boolean {
    let i,
      j,
      c = false;
    let nvert = verts.length;
    for (i = 0, j = nvert - 1; i < nvert; j = i++) {
      if (
        verts[i].y > testy != verts[j].y > testy &&
        testx <
          ((verts[j].x - verts[i].x) * (testy - verts[i].y)) /
            (verts[j].y - verts[i].y) +
            verts[i].x
      )
        c = !c;
    }
    return c;
  }

  /**
   * 菱形区域矩形获取检测
   * @param verts [左上，坐下，右下，右上]
   */
  public static getViewClipCoords(
    verts: cc.Vec2[],
    min?: number,
    max?: number,
    callBack?: any
  ): cc.Vec2[] {
    let coords = [];
    let horizontal = verts[3].x - verts[0].x;
    let vertical = verts[0].y - verts[1].y;

    let push = (coord) => {
      coords.push(coord);
      !!callBack && callBack(coord);
    };

    for (let i = 0; i <= horizontal; i++) {
      for (
        let x = verts[0].x + i, y = verts[0].y + i, j = 0;
        j <= vertical;
        j++
      ) {
        let xr = x + j,
          y1 = y - j,
          y2 = y1 - 1;
        if (min != null && max != null) {
          if (xr < min || xr >= max) continue;
          if (y1 >= min && y1 < max) push(cc.v2(xr, y1));
          if (y2 >= min && y2 < max) push(cc.v2(xr, y2));
        } else {
          push(cc.v2(xr, y1));
          push(cc.v2(xr, y2));
        }
      }
    }
    return coords;
  }

  public static getViewRectangleCoods(
    verts: cc.Vec2[],
    callBack?: any
  ): cc.Vec2[] {
    let coords = [];
    let push = (coord) => {
      coords.push(coord);
      !!callBack && callBack(coord);
    };

    for (let i = verts[0].x; i <= verts[3].x; i++) {
      for (let j = verts[1].y; j <= verts[0].y; j++) {
        push(cc.v2(i, j));
      }
    }
    return coords;
  }

  /** 回形遍历 */
  public static rASeaches(
    centerPos: cc.Vec2,
    isTarget: { (coord: cc.Vec2): boolean },
    r?: number
  ): cc.Vec2 {
    let step = 0;
    let curPos = centerPos;
    let isEnd = isTarget(curPos);
    if (!r) r = 20;
    while (!isEnd) {
      if (step > r) break;
      step++;
      for (let cStepX = -step; cStepX < step; cStepX++) {
        curPos = cc.v2(centerPos.x + cStepX, centerPos.y - step);
        isEnd = isTarget(curPos);
        if (!isEnd) continue;
        break;
      }
      if (!isEnd)
        for (let cStepY = -step; cStepY < step; cStepY++) {
          curPos = cc.v2(centerPos.x + step, centerPos.y + cStepY);
          isEnd = isTarget(curPos);
          if (!isEnd) continue;
          break;
        }
      if (!isEnd)
        for (let cStepX = step; cStepX > -step; cStepX--) {
          curPos = cc.v2(centerPos.x + cStepX, centerPos.y + step);
          isEnd = isTarget(curPos);
          if (!isEnd) continue;
          break;
        }
      if (!isEnd)
        for (let cStepY = step; cStepY > -step; cStepY--) {
          curPos = cc.v2(centerPos.x - step, centerPos.y + cStepY);
          isEnd = isTarget(curPos);
          if (!isEnd) continue;
          break;
        }
    }
    return curPos;
  }

  public static getRightAngleRoute(air: cc.Vec2, cur: cc.Vec2): cc.Vec2[] {
    let ret: cc.Vec2[] = [];
    let step = (air.x - cur.x) / Math.abs(air.x - cur.x);
    for (let x = cur.x; x != air.x; x += step) {
      ret.push(cc.v2(x, cur.y));
    }
    step = (air.y - cur.y) / Math.abs(air.y - cur.y);
    for (let y = cur.y; y != air.y; y += step) {
      ret.push(cc.v2(air.x, y));
    }
    return ret;
  }

  public static prefixZero(num: number, n: number) {
    return (Array(n).join("0") + num).slice(-n);
  }

  public static newArray(len: number, fill?: number): Array<number> {
    let arr = [];
    for (let i = 0; i < len; i++) {
      arr.push(fill || 0);
    }
    return arr;
  }

  public static random(min?: number, max?: number): number {
    min = min || 0;
    max = max === null || max === undefined ? 100 : max;
    let res = Math.floor(min + Math.random() * (max - min + 1));
    return res;
  }

  public static randoms(len: number, min: number, max: number): number[] {
    if (len >= max - min)
      return this.newArray(max - min).map((v, i) => i + min);
    let arr = this.newArray(max - min).map((v, i) => i + min);
    var rds = new Array();
    for (var i = 0; i < len; i++) {
      if (arr.length <= 0) break;
      var arrIndex = Math.floor(this.random(0, arr.length - 1));
      rds[i] = arr[arrIndex];
      arr.splice(arrIndex, 1);
    }
    return rds;
  }

  /**随机抽取数组中元素 */
  public static getRandomArrayElements<T>(arr, count: number): T[] {
    var shuffled = arr.slice(0),
      i = arr.length,
      min = i - count,
      temp,
      index;
    while (i-- > min) {
      index = Math.floor((i + 1) * Math.random());
      temp = shuffled[index];
      shuffled[index] = shuffled[i];
      shuffled[i] = temp;
    }
    return shuffled.slice(min);
  }
  /**
   * 数组乱序
   * @param array
   */
  public static fisherYatesShuffle<T>(array: Array<T>): Array<T> {
    let result: Array<T> = [];
    for (let i = 0; i < array.length; i++) {
      result.push(array[i]);
    }
    let m = result.length;
    let t, j;
    while (m) {
      j = Math.floor(Math.random() * m--);
      t = result[m];
      result[m] = result[j];
      result[j] = t;
    }
    return result;
  }

  public static prefixInteger(num: number, length: number) {
    return (Array(length).join("0") + num).slice(-length);
  }

  public static rayPlaneIntersectPoint(
    ray: cc.geomUtils.Ray,
    plane: Plane
  ): cc.Vec3 {
    let p = new cc.Vec3();
    let t = plane.n.dot(plane.p) - plane.n.dot(ray.o) / plane.n.dot(ray.d);
    p.x = ray.o.x + ray.d.x * t;
    p.y = ray.o.y + ray.d.y * t;
    p.z = ray.o.z + ray.d.z * t;
    return p;
  }

  /**随机获取 */
  public static getRandom(min, max, length, arr) {
    //随机数
    let random = Math.random() * (max - min) + min;
    //向下取整
    random = Math.floor(random);
    if (arr.length < length) {
      for (
        let i = 0;
        i <= arr.length;
        i++ //遍历数组。
      ) {
        if (random == arr[i]) {
          //比较随机数
          break;
        } else {
          if (i == arr.length) {
            arr.push(random);
            break;
          }
        }
      }
      this.getRandom(min, max, length, arr);
    }
    return arr;
  }
}
