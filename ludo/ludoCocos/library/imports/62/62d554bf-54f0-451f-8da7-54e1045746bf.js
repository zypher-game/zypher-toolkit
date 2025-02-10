"use strict";
cc._RF.push(module, '62d55S/VPBFH42nVOEEV0a/', 'MathEx');
// Script/Core/Math/MathEx.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Plane = exports.GRID_TEXTURE_CHEK_RANGE = void 0;
/** 格子检测范围 */
exports.GRID_TEXTURE_CHEK_RANGE = 3;
var Plane = /** @class */ (function () {
    function Plane() {
    }
    return Plane;
}());
exports.Plane = Plane;
var MathEx = /** @class */ (function () {
    function MathEx() {
    }
    MathEx.angle2Radian = function (angle) {
        return ((this.PI * angle) % 360) / 180;
    };
    MathEx.radian2Angle = function (radian) {
        return (radian * 180) / this.PI;
    };
    MathEx.angleByPos = function (c1, c2, c3, c4) {
        if (c1 instanceof cc.Vec2 && c2 instanceof cc.Vec2) {
            var p = new cc.Vec2();
            p.x = c2.x - c1.y;
            p.y = c2.y - c1.y;
            return (Math.atan2(p.y, p.x) * 180) / this.PI;
        }
        else if (typeof c1 == "number" && typeof c2 == "number") {
            var p = new cc.Vec2();
            p.x = c3 - c1;
            p.y = c4 - c2;
            return (Math.atan2(p.y, p.x) * 180) / this.PI;
        }
        return 0;
    };
    MathEx.pLineIntersect = function (A, B, C, D, retP) {
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
    };
    MathEx.pSegmentIntersect = function (A, B, C, D) {
        var retP = cc.v2(0, 0);
        if (this.pLineIntersect(A, B, C, D, retP))
            if (retP.x >= 0.0 && retP.x <= 1.0 && retP.y >= 0.0 && retP.y <= 1.0)
                return true;
        return false;
    };
    MathEx.segmentIntersectRect = function (ps, pe, r) {
        // 先判断是否包含
        if (r.contains(ps) && r.contains(pe))
            return true;
        return (this.pSegmentIntersect(ps, pe, cc.v2(r.xMin, r.yMin), cc.v2(r.xMin, r.yMax)) ||
            this.pSegmentIntersect(ps, pe, cc.v2(r.xMin, r.yMin), cc.v2(r.xMax, r.yMin)) ||
            this.pSegmentIntersect(ps, pe, cc.v2(r.xMin, r.yMax), cc.v2(r.xMax, r.yMax)) ||
            this.pSegmentIntersect(ps, pe, cc.v2(r.xMax, r.yMax), cc.v2(r.xMax, r.yMin)));
    };
    /**
     * 获取起点和终点经过的以单位大小（1，1）组成网格的格子集合
     * @param ps 起点
     * @param pe 终点
     */
    MathEx.segmentArounds = function (ps, pe) {
        var coords = [];
        // 竖
        if (ps.x == pe.x) {
            var dis = pe.y - ps.y;
            var absDis = Math.abs(dis);
            for (var i = 1; i <= absDis; i++) {
                coords.push(cc.v2(ps.x, ps.y + (dis / absDis) * i));
            }
            return coords;
        }
        // 横
        if (ps.y == pe.y) {
            var dis = pe.x - ps.x;
            var absDis = Math.abs(dis);
            for (var i = 1; i <= absDis; i++) {
                coords.push(cc.v2(ps.x + (dis / absDis) * i, ps.y));
            }
            return coords;
        }
        // 直线公式： y = kx + b; k 为斜率 = tan;
        var tan = (pe.y - ps.y) / (pe.x - ps.x);
        var b = ps.y - ps.x * tan;
        var absTan = Math.abs(tan);
        if (absTan > 0 && absTan <= 1) {
            // 说明x增量大于y增量， 以x遍历
            var iter = ps.x < pe.x ? 1 : -1;
            for (var x = ps.x; (iter > 0 && x <= pe.x) || (iter < 0 && x >= pe.x); x += iter) {
                var y = Math.floor(tan * x + b);
                coords.push(cc.v2(x, y));
            }
        }
        else {
            var iter = ps.y < pe.y ? 1 : -1;
            for (var y = ps.y; (iter > 0 && y <= pe.y) || (iter < 0 && y >= pe.y); y += iter) {
                var x = Math.floor((y - b) / tan);
                coords.push(cc.v2(x, y));
            }
        }
        return coords;
    };
    /**
     * 获取两点之间经过的坐标
     * @param c1
     * @param c2
     * @param c3
     * @param c4
     */
    MathEx.getSegmentArounds = function (c1, c2, c3, c4) {
        if (c1 instanceof cc.Vec2 && c2 instanceof cc.Vec2) {
            return MathEx.segmentArounds(c1, c2);
        }
        else if (typeof c1 == "number" && typeof c2 == "number") {
            return MathEx.segmentArounds(cc.v2(c1, c2), cc.v2(c3, c4));
        }
        return null;
    };
    /**
     * 取俩点距离
     * @param c1
     * @param c2
     * @param c3
     * @param c4
     */
    MathEx.getDistance = function (c1, c2, c3, c4) {
        if (typeof c1 != "number" && typeof c2 != "number") {
            return c1.sub(c2).mag();
        }
        else if (typeof c1 == "number" && typeof c2 == "number") {
            var xDis = c1 - c3, yDis = c2 - c4;
            var dis = Math.sqrt(xDis * xDis + yDis * yDis);
            return dis;
        }
        return -1;
    };
    /**
     * 求ab向量的夹角
     */
    MathEx.getAngleAB = function (a, b) {
        var vDis = b.sub(a);
        var fADis = a.mag(), fBDis = b.mag();
        var cosVal = vDis.dot(a) / (fADis * fBDis);
        var angle = (Math.acos(cosVal) * 180) / this.PI;
        return -angle;
    };
    /** 求AB点和x（水平面）轴的夹角 */
    MathEx.getAngleX = function (a, b) {
        var vDis = b.sub(a);
        var fDis = vDis.mag();
        var cosVal = vDis.dot(cc.Vec2.RIGHT) / fDis;
        var angle = (Math.acos(cosVal) * 180) / this.PI;
        if (vDis.x > 0 && vDis.y > 0)
            return angle;
        else if (vDis.x >= 0 && vDis.y <= 0)
            return -angle;
        else if (vDis.x <= 0 && vDis.y >= 0)
            return angle;
        else if (vDis.x <= 0 && vDis.y <= 0)
            return -angle;
        else
            return angle;
    };
    MathEx.getAnglePos = function (angle, width) {
        var radian = cc.misc.degreesToRadians(angle);
        return cc.v2(Math.cos(radian) * width, Math.sin(radian) * width);
    };
    /**
     * 获取周围的八个格子
     * @param coord 坐标
     */
    MathEx.getAroundCoords = function (coord, y) {
        var coords = [];
        if (coord instanceof cc.Vec2) {
            var startPos = cc.v2(coord.x - 1, coord.y - 1);
            for (var j = 0; j < exports.GRID_TEXTURE_CHEK_RANGE; j++) {
                for (var i = 0; i < exports.GRID_TEXTURE_CHEK_RANGE; i++) {
                    var pos = cc.v2(startPos.x + i, startPos.y + j);
                    if (pos.x == coord.x && pos.y == coord.y)
                        continue;
                    coords.push(pos);
                }
            }
        }
        else {
            var startPos = cc.v2(coord - 1, y - 1);
            for (var j = 0; j < exports.GRID_TEXTURE_CHEK_RANGE; j++) {
                for (var i = 0; i < exports.GRID_TEXTURE_CHEK_RANGE; i++) {
                    var pos = cc.v2(startPos.x + i, startPos.y + j);
                    if (pos.x == coord && pos.y == y)
                        continue;
                    coords.push(pos);
                }
            }
        }
        return coords;
    };
    /**
     * 获取以center为圆心的range为半径的地块坐标
     * @param center
     * @param range
     */
    MathEx.getRangeCoords = function (center, range, size) {
        var coords = [];
        for (var j = -range; j <= range; j++) {
            for (var i = -range; i <= range; i++) {
                var air = cc.v2(center.x + i, center.y + j);
                if (air.x < 0 ||
                    air.x >= size.width - 1 ||
                    air.y < 0 ||
                    air.y >= size.height)
                    continue;
                var distance = Math.ceil(MathEx.getDistance(center, air));
                if (distance > range)
                    continue;
                coords.push(air);
            }
        }
        return coords;
    };
    /**
     * 不规则多边形检测
     * @param testx
     * @param testy
     * @param verts
     */
    MathEx.irregularCheck = function (testx, testy, verts) {
        var i, j, c = false;
        var nvert = verts.length;
        for (i = 0, j = nvert - 1; i < nvert; j = i++) {
            if (verts[i].y > testy != verts[j].y > testy &&
                testx <
                    ((verts[j].x - verts[i].x) * (testy - verts[i].y)) /
                        (verts[j].y - verts[i].y) +
                        verts[i].x)
                c = !c;
        }
        return c;
    };
    /**
     * 菱形区域矩形获取检测
     * @param verts [左上，坐下，右下，右上]
     */
    MathEx.getViewClipCoords = function (verts, min, max, callBack) {
        var coords = [];
        var horizontal = verts[3].x - verts[0].x;
        var vertical = verts[0].y - verts[1].y;
        var push = function (coord) {
            coords.push(coord);
            !!callBack && callBack(coord);
        };
        for (var i = 0; i <= horizontal; i++) {
            for (var x = verts[0].x + i, y = verts[0].y + i, j = 0; j <= vertical; j++) {
                var xr = x + j, y1 = y - j, y2 = y1 - 1;
                if (min != null && max != null) {
                    if (xr < min || xr >= max)
                        continue;
                    if (y1 >= min && y1 < max)
                        push(cc.v2(xr, y1));
                    if (y2 >= min && y2 < max)
                        push(cc.v2(xr, y2));
                }
                else {
                    push(cc.v2(xr, y1));
                    push(cc.v2(xr, y2));
                }
            }
        }
        return coords;
    };
    MathEx.getViewRectangleCoods = function (verts, callBack) {
        var coords = [];
        var push = function (coord) {
            coords.push(coord);
            !!callBack && callBack(coord);
        };
        for (var i = verts[0].x; i <= verts[3].x; i++) {
            for (var j = verts[1].y; j <= verts[0].y; j++) {
                push(cc.v2(i, j));
            }
        }
        return coords;
    };
    /** 回形遍历 */
    MathEx.rASeaches = function (centerPos, isTarget, r) {
        var step = 0;
        var curPos = centerPos;
        var isEnd = isTarget(curPos);
        if (!r)
            r = 20;
        while (!isEnd) {
            if (step > r)
                break;
            step++;
            for (var cStepX = -step; cStepX < step; cStepX++) {
                curPos = cc.v2(centerPos.x + cStepX, centerPos.y - step);
                isEnd = isTarget(curPos);
                if (!isEnd)
                    continue;
                break;
            }
            if (!isEnd)
                for (var cStepY = -step; cStepY < step; cStepY++) {
                    curPos = cc.v2(centerPos.x + step, centerPos.y + cStepY);
                    isEnd = isTarget(curPos);
                    if (!isEnd)
                        continue;
                    break;
                }
            if (!isEnd)
                for (var cStepX = step; cStepX > -step; cStepX--) {
                    curPos = cc.v2(centerPos.x + cStepX, centerPos.y + step);
                    isEnd = isTarget(curPos);
                    if (!isEnd)
                        continue;
                    break;
                }
            if (!isEnd)
                for (var cStepY = step; cStepY > -step; cStepY--) {
                    curPos = cc.v2(centerPos.x - step, centerPos.y + cStepY);
                    isEnd = isTarget(curPos);
                    if (!isEnd)
                        continue;
                    break;
                }
        }
        return curPos;
    };
    MathEx.getRightAngleRoute = function (air, cur) {
        var ret = [];
        var step = (air.x - cur.x) / Math.abs(air.x - cur.x);
        for (var x = cur.x; x != air.x; x += step) {
            ret.push(cc.v2(x, cur.y));
        }
        step = (air.y - cur.y) / Math.abs(air.y - cur.y);
        for (var y = cur.y; y != air.y; y += step) {
            ret.push(cc.v2(air.x, y));
        }
        return ret;
    };
    MathEx.prefixZero = function (num, n) {
        return (Array(n).join("0") + num).slice(-n);
    };
    MathEx.newArray = function (len, fill) {
        var arr = [];
        for (var i = 0; i < len; i++) {
            arr.push(fill || 0);
        }
        return arr;
    };
    MathEx.random = function (min, max) {
        min = min || 0;
        max = max === null || max === undefined ? 100 : max;
        var res = Math.floor(min + Math.random() * (max - min + 1));
        return res;
    };
    MathEx.randoms = function (len, min, max) {
        if (len >= max - min)
            return this.newArray(max - min).map(function (v, i) { return i + min; });
        var arr = this.newArray(max - min).map(function (v, i) { return i + min; });
        var rds = new Array();
        for (var i = 0; i < len; i++) {
            if (arr.length <= 0)
                break;
            var arrIndex = Math.floor(this.random(0, arr.length - 1));
            rds[i] = arr[arrIndex];
            arr.splice(arrIndex, 1);
        }
        return rds;
    };
    /**随机抽取数组中元素 */
    MathEx.getRandomArrayElements = function (arr, count) {
        var shuffled = arr.slice(0), i = arr.length, min = i - count, temp, index;
        while (i-- > min) {
            index = Math.floor((i + 1) * Math.random());
            temp = shuffled[index];
            shuffled[index] = shuffled[i];
            shuffled[i] = temp;
        }
        return shuffled.slice(min);
    };
    /**
     * 数组乱序
     * @param array
     */
    MathEx.fisherYatesShuffle = function (array) {
        var result = [];
        for (var i = 0; i < array.length; i++) {
            result.push(array[i]);
        }
        var m = result.length;
        var t, j;
        while (m) {
            j = Math.floor(Math.random() * m--);
            t = result[m];
            result[m] = result[j];
            result[j] = t;
        }
        return result;
    };
    MathEx.prefixInteger = function (num, length) {
        return (Array(length).join("0") + num).slice(-length);
    };
    MathEx.rayPlaneIntersectPoint = function (ray, plane) {
        var p = new cc.Vec3();
        var t = plane.n.dot(plane.p) - plane.n.dot(ray.o) / plane.n.dot(ray.d);
        p.x = ray.o.x + ray.d.x * t;
        p.y = ray.o.y + ray.d.y * t;
        p.z = ray.o.z + ray.d.z * t;
        return p;
    };
    /**随机获取 */
    MathEx.getRandom = function (min, max, length, arr) {
        //随机数
        var random = Math.random() * (max - min) + min;
        //向下取整
        random = Math.floor(random);
        if (arr.length < length) {
            for (var i = 0; i <= arr.length; i++ //遍历数组。
            ) {
                if (random == arr[i]) {
                    //比较随机数
                    break;
                }
                else {
                    if (i == arr.length) {
                        arr.push(random);
                        break;
                    }
                }
            }
            this.getRandom(min, max, length, arr);
        }
        return arr;
    };
    MathEx.PI = 3.1415926;
    return MathEx;
}());
exports.default = MathEx;

cc._RF.pop();