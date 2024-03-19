var CPlants = NewO({

    name: "Plants",

    HP: 300,

    PKind: 1,

    beAttackedPointL: 20,

    CardGif: 0,

    StaticGif: 1,

    NormalGif: 2,

    BookHandBack: 0,

    canEat: 1,

    zIndex: 0,

    AudioArr: [],

    coolTime: 7.5,

    CanSelect: 1,

    canTrigger: 1,

    Stature: 0,

    Sleep: 0,

    CanGrow: function(c, b, e) {

      var a = b + "_" + e,

        d = oS.ArP;

      return d ? oGd.$LF[b] == 1 ? e > 0 && e < d.ArC[1] && !(oGd.$Crater[a] || oGd.$Tombstones[a] || c[1]) : c[0] && !c[1] : oGd.$LF[b] == 1 ? !(e < 1 || e > 9 || oGd.$Crater[a] || oGd.$Tombstones[a] || c[1]) : c[0] && !c[1]

    },

    getHurt: function(e, c, b) {

      var d = this,

        a = d.id;

      !(c % 3) ? (d.HP -= b) < 1 && d.Die(): d.Die()

    },

    GetDY: function(b, c, a) {

      return a[0] ? -21 : -15

    },

    GetDX: function() {

      return -Math.floor(this.width * .5)

    },

    GetDBottom: function() {

      return this.height

    },

    Birth: function(d, c, h, a, m, n) {

      var e = this,

        k = d + e.GetDX(),

        i = c + e.GetDY(h, a, m),

        l = e.prototype,

        g = i - e.height,

        b = e.id = "P_" + Math.random(),

        j = e.zIndex += 3 * h,

        f = NewEle(0, "div", "position:absolute");

      NewImg(0, ShadowPNG, e.getShadow(e), f);

      NewImg(0, e.PicArr[e.NormalGif], "", f);

      e.pixelLeft = k;

      e.pixelRight = k + e.width;

      e.pixelTop = g;

      e.pixelBottom = g + e.GetDBottom();

      e.opacity = 1;

      e.InitTrigger(e, b, e.R = h, e.C = a, e.AttackedLX = k + e.beAttackedPointL, e.AttackedRX = k + e.beAttackedPointR);

      $P[b] = e;

      $P.length += 1;

      e.BirthStyle(e, b, f, {

        left: k + "px",

        top: g + "px",

        zIndex: j

      }, n);

      oGd.add(e, h + "_" + a + "_" + e.PKind);

      e.PrivateBirth(e, n)

    },

    getShadow: function(a) {

      return "left:" + (a.width * .5 - 48) + "px;top:" + (a.height - 22) + "px"

    },

    BirthStyle: function(c, d, b, a) {

      EditEle(b, {

        id: d

      }, a, EDPZ)

    },

    PrivateBirth: function(a) {},

    getTriggerRange: function(a, b, c) {

      return [

        [b, oS.W, 0]

      ]

    },

    getTriggerR: function(a) {

      return [a, a]

    },

    InitTrigger: function(c, b, f, a, h, g) {

      var j = {},

        i = c.getTriggerR(f),

        e = i[0],

        d = i[1];

      do {

        oT.add(e, j[e] = c.getTriggerRange(e, h, g), b)

      } while (e++ != d);

      c.oTrigger = j

    },

    TriggerCheck: function(b, a) {

      this.AttackCheck2(b) && (this.canTrigger = 0, this.CheckLoop(b.id, a))

    },

    CheckLoop: function(b, c) {

      var a = this.id;

      this.NormalAttack(b);

      oSym.addTask(140, function(e, f, h) {

        var g;

        (g = $P[e]) && g.AttackCheck1(f, h)

      }, [a, b, c])

    },

    AttackCheck1: function(g, f) {

      var b = this,

        c = b.oTrigger,

        a = $Z[g],

        h, e, k, j;

      if (a && a.PZ && (h = c[a.R])) {

        k = a.ZX;

        e = h.length;

        while (e--) {

          j = h[e];

          if (j[0] <= k && j[1] >= k && b.AttackCheck2(a)) {

            b.CheckLoop(g, j[2]);

            return

          }

        }

      }

      b.canTrigger = 1

    },

    AttackCheck2: function(a) {

      return a.Altitude > 0

    },

    PrivateDie: function(a) {},

    BoomDie: function() {

      var a = this,

        b = a.id;

      a.oTrigger && oT.delP(a);

      a.HP = 0;

      delete $P[b];

      delete oGd.$[a.R + "_" + a.C + "_" + a.PKind];

      $P.length -= 1;

      ClearChild($(b));

      a.PrivateDie(a)

    },

    Die: function(a) {

      var b = this,

        c = b.id;

      b.oTrigger && oT.delP(b);

      b.HP = 0;

      delete $P[c];

      delete oGd.$[b.R + "_" + b.C + "_" + b.PKind];

      $P.length -= 1;

      !a && ClearChild($(c));

      b.PrivateDie(b)

    }

  }),

  oGraveBuster = InheritO(CPlants, {

    EName: "oGraveBuster",

    CName: "Jiaochiaobei",

    width: 99,

    height: 106,

    beAttackedPointR: 70,

    SunNum: 75,

    BookHandBack: 2.5,

    canEat: 0,

    PicArr: ["images/Card/Plants/GraveBuster.png", "images/Plants/GraveBuster/0.gif", "images/Plants/GraveBuster/GraveBuster.gif" + $Random + Math.random()],

    AudioArr: ["gravebusterchomp"],

    CanGrow: function(b, a, d) {

      var c = oS.ArP;

      return c ? d > 0 && d < c.ArC[1] && (a + "_" + d in oGd.$Tombstones && !b[1]) : a + "_" + d in oGd.$Tombstones && !b[1]

    },

    getShadow: function(a) {

      return "left:" + (a.width * .5 - 48) + "px;top:" + a.height + "px"

    },

    BirthStyle: function(c, d, b, a) {

      EditEle(b, {

        id: d

      }, a, EDPZ)

    },

    GetDY: function(b, c, a) {

      return -30

    },

    InitTrigger: function() {},

    Tooltip: "Bite the tombstone to eat the tombstone.",

    Produce: 'Bite bites are used to eat tombstones. <p>Usage: <font color="#FF0000">Single use, only effective for tombstones. </font><br>Features: <font color="#FF0000">Swallows tombstones. </font></p>Although the appearance of Biting Bei is very scary, he wants everyone </font><br> to know that he actually likes kittens and uses his spare time </font><br> While working as a volunteer at a zombie rehabilitation center. "I'm just</font><br>doing the right thing," he said. ',

    PrivateBirth: function(a) {

      PlayAudio("gravebusterchomp");

      oSym.addTask(420, function(b) {

        var e = $P[b],

          c, d, f;

        e && (d = e.R, f = e.C, delete oGd.$Tombstones[c = d + "_" + f], e.Die(), ClearChild($("dTombstones" + c)), oS.StaticCard && AppearSun(Math.floor(GetX(f) + Math.random() * 41), GetY(d), 25, 0))

      }, [a.id])

    }

  }),

  oLawnCleaner = InheritO(CPlants, {

    EName: "oLawnCleaner",

    CName: "Lawn Mower",

    width: 71,

    height: 57,

    beAttackedPointL: 0,

    beAttackedPointR: 71,

    SunNum: 0,

    PicArr: ["images/interface/LawnCleaner.png", "images/interface/LawnCleaner1.png"],

    AudioArr: ["lawnmower"],

    NormalGif: 0,

    canEat: 0,

    Stature: 1,

    getShadow: function(a) {

      return "left:" + (a.width * .5 - 38) + "px;top:" + (a.height - 22) + "px"

    },

    getTriggerRange: function(a, b, c) {

      return [

        [b, c, 0]

      ]

    },

    TriggerCheck: function(b, a) {

      b.beAttacked && b.Altitude > 0 && (this.canTrigger = 0, this.NormalAttack(this))

    },

    BoomDie: function() {},

    Tooltip: "The most common lawn mower",

    NormalAttack: function(a) {

      PlayAudio(a.AudioArr[0]);

      (function(b, c, k, j, e, g) {

        var d = oZ.getArZ(k, j, e),

          f = d.length,

          h;

        $(a.id).childNodes[1].src = "images/interface/LawnCleaner1.png";

        while (f--) {

          (h = d[f]).getCrushed(b) && h.CrushDie()

        }

        k > c ? b.Die() : (b.pixelRight += 10, b.AttackedLX = k += 10, b.AttackedRX = j += 10, g.style.left = (b.pixelLeft += 10) + "px", oSym.addTask(1, arguments.callee, [b, c, k, j, e, g]), [this])

      })(a, oS.W, a.AttackedLX, a.AttackedRX, a.R, $(a.id))

    }

  }),

  oCleaner1 = InheritO(oLawnCleaner, {

    EName: "oCleaner",

    CName: "Firecracker",

    width: 80,

    height: 80,

    beAttackedPointL: 0,

    beAttackedPointR: 57,

    SunNum: 0,

    PicArr: ["images/interface/BZ.png", "images/Plants/Jalapeno/JalapenoAttack.gif"],

    Tooltip: "Firecracker",

    AudioArr: ["jalapeno"]

  }),

  oCleaner = InheritO(oCleaner1, {

    EName: "oCleaner",

    NormalAttack: function(a) {

      oSym.addTask(40, function(j) {

        var h = $P[j];

        if (h) {

          PlayAudio("jalapeno");

          var b = $(j),

            f = h.R,

            c = oZ.getArZ(100, oS.W, f),

            e = c.length,

            g = oGd.$Ice[f],

            d = oGd.$Crater;

          while (e--) {

            c[e].getExplosion()

          }

          h.Die(1);

          EditEle(b.childNodes[1], {

            src: "images/Plants/Jalapeno/JalapenoAttack.gif"

          }, {

            width: "755px",

            height: "131px",

            left: 120 - h.pixelLeft + "px",

            top: "-42px"

          });

          oSym.addTask(135, ClearChild, [b]);

          ClearChild($("dIceCar" + f));

          if (g) {

            for (e = g[1]; e < 11; e++) {

              delete d[f + "_" + e]

            }

          }

        }

      }, [a.id])

    }

  }),

  oPoolCleaner = InheritO(oLawnCleaner, {

    EName: "oPoolCleaner",

    CName: "Pond Sweeper",

    width: 47,

    height: 64,

    beAttackedPointL: 0,

    beAttackedPointR: 47,

    SunNum: 0,

    PicArr: ["images/interface/PoolCleaner.png", "images/interface/PoolCleaner1.png"],

    Tooltip: "Pond Sweeper",

    AudioArr: ["pool_cleaner"],

    NormalAttack: function(a) {

      PlayAudio(a.AudioArr[0]);

      (function(b, c, k, j, e, g) {

        var d = oZ.getArZ(k, j, e),

          f = d.length,

          h;

        $(a.id).childNodes[1].src = "images/interface/PoolCleaner1.png";

        while (f--) {

          (h = d[f]).getCrushed(b) && h.CrushDie()

        }

        k > c ? b.Die() : (b.pixelRight += 10, b.AttackedLX = k += 10, b.AttackedRX = j += 10, g.style.left = (b.pixelLeft += 10) + "px", oSym.addTask(1, arguments.callee, [b, c, k, j, e, g]), [this])

      })(a, oS.W, a.AttackedLX, a.AttackedRX, a.R, $(a.id))

    }

  }),

  oBrains = InheritO(CPlants, {

    EName: "oBrains",

    CName: "brain",

    width: 32,

    height: 31,

    beAttackedPointL: 0,

    beAttackedPointR: 32,

    SunNum: 0,

    HP: 1,

    PicArr: ["images/interface/brain.png"],

    Tooltip: "delicious brain",

    NormalGif: 0,

    InitTrigger: function() {},

    PrivateBirth: function(a) {

      a.PrivateDie = oS.BrainsNum ? (a.DieStep = Math.floor(150 / oS.BrainsNum), function(d) {

        var c, b;

        AppearSun(Math.floor(GetX(d.C) - 40 + Math.random() * 41), GetY(d.R), 50, 0);

        (b = --oS.BrainsNum) ? (c = b * d.DieStep, $("imgFlagHead").style.left = c - 11 + "px", $("imgFlagMeterFull").style.clip = "rect(0,157px,21px," + c + "px)") : ($("imgFlagHead").style.left = "-1px", $("imgFlagMeterFull").style.clip = "rect(0,157px,21px,0)", oP.FlagToEnd())

      }) : function(b) {

        GameOver()

      }

    },

    GetDX: function() {

      return -40

    }

  }),

  oStarfruit = InheritO(CPlants, {

    EName: "oStarfruit",

    CName: "Carambola",

    width: 77,

    height: 70,

    beAttackedPointR: 57,

    SunNum: 125,

    GetDY: function(b, c, a) {

      return a[0] ? -17 : -10

    },

    PicArr: ["images/Card/Plants/Starfruit.png", "images/Plants/Starfruit/0.gif", "images/Plants/Starfruit/Starfruit.gif", "images/Plants/Starfruit/Star.gif"],

    Tooltip: "Shoot star fruit in five directions",

    Produce: 'Starfruit can launch small starberries in five directions. <p>Damage: <font color="#FF0000">Medium</font><br>Range: <font color="#FF0000">Five directions</font></p> Starfruit: "Hey, man , one day I went to the dentist and he said </font><br>I have four cavities. When I counted, I only had one tooth! One </font><br>tooth has four teeth Hole? How could this happen?"',

    getTriggerRange: function(e, g, f) {

      var a = this.R,

        b = GetY(a),

        c = oS.W,

        j = this.ArFlyTime,

        h = this.ArHitX,

        i, d = .5 * (g + f);

      !j && (j = this.ArFlyTime = {}, h = this.ArHitX = {});

      switch (true) {

        case e < a:

          j[e] = [(i = b - GetY(e)) / 5, i / 3];

          h[e] = [d, d + i / 3 * 4];

          return [

            [100, c, 0]

          ];

        case e == a:

          return [

            [100, g + 25, 4]

          ];

        default:

          j[e] = [(i = GetY(e) - b) / 5, i / 3];

          h[e] = [d, d + i / 3 * 4];

          return [

            [100, c, 0]

          ]

      }

    },

    AttackCheck2: function(l) {

      var j = lR;

      if (j == this.R) {

        return l.Altitude > 0

      }

      var q = 0,

        t = l.AttackedLX,

        b = l.AttackedRX,

        e, g, d = this.ArFlyTime,

        c = this.ArHitX,

        s = d[j],

        r = c[j],

        f = l.WalkDirection ? -1 : 1,

        k = false,

        m, p, n, h, a = l.Speed;

      while (q < s.length) {

        h = a * s[q] * f * .1;

        e = Math.floor(t - h);

        g = Math.floor(b - h);

        p = r[0];

        n = r[1];

        if (e + 20 < p && g - 20 > p || e < n && g > n) {

          k = true;

          break

        }++q

      }

      return k && l.Altitude > 0

    },

    getTriggerR: function(a) {

      return [1, oS.R]

    },

    PrivateBirth: function(d) {

      var c = d.pixelLeft + 38,

        b = c - 15,

        a = d.pixelTop + 20;

      d.BulletEle = NewImg(0, "images/Plants/Starfruit/Star.gif", "left:" + b + "px;top:" + a + "px;z-index:" + (d.zIndex + 2))

    },

    PrivateDie: function(a) {

      a.BulletEle = null

    },

    getHurt: function(d, b, a) {

      var c = this;

      b != 3 && c.NormalAttack();

      (c.HP -= a) < 1 && c.Die()

    },

    NormalAttack: function() {

      var g = this,

        f = g.pixelLeft + 38,

        d = f - 15,

        b = g.pixelTop + 20,

        c = g.R,

        e = f + 15,

        a = function(j, i, h) {

          return j && j.Altitude == 1 ? (j.getPea(j, 20, i), ClearChild(h), false) : true

        };

      (function(h) {

        oSym.addTask(15, function(j) {

          var i = $(j);

          i && SetVisible(i)

        }, [h]);

        oSym.addTask(1, function(m, k, l, i, j) {

          j(oZ.getZ1(m, k), 4, i) && ((m -= 5) < 100 ? ClearChild(i) : (i.style.left = (l -= 5) + "px", oSym.addTask(1, arguments.callee, [m, k, l, i, j])))

        }, [f, c, d, EditEle(g.BulletEle.cloneNode(false), {

          id: h

        }, 0, EDPZ), a])

      })("StarB" + Math.random());

      (function(h) {

        oSym.addTask(15, function(j) {

          var i = $(j);

          i && SetVisible(i)

        }, [h]);

        oSym.addTask(1, function(m, n, l, k, i, j) {

          j(oZ.getRangeLeftZ(m, n, l), 6, i) && ((k -= 5) < -15 ? ClearChild(i) : (i.style.top = k + "px", oSym.addTask(1, arguments.callee, [m, n, GetR(k + 15), k, i, j])))

        }, [d, e, c, b, EditEle(g.BulletEle.cloneNode(false), {

          id: h

        }, 0, EDPZ), a])

      })("StarB" + Math.random());

      (function(h) {

        oSym.addTask(15, function(j) {

          var i = $(j);

          i && SetVisible(i)

        }, [h]);

        oSym.addTask(1, function(m, n, l, k, i, j) {

          j(oZ.getRangeLeftZ(m, n, l), 2, i) && ((k += 5) > 600 ? ClearChild(i) : (i.style.top = k + "px", oSym.addTask(1, arguments.callee, [m, n, GetR(k + 15), k, i, j])))

        }, [d, e, c, b, EditEle(g.BulletEle.cloneNode(false), {

          id: h

        }, 0, EDPZ), a])

      })("StarB" + Math.random());

      (function(h) {

        oSym.addTask(15, function(j) {

          var i = $(j);

          i && SetVisible(i)

        }, [h]);

        oSym.addTask(1, function(n, l, m, k, i, j) {

          j(oZ.getZ0(n, l), 7, i) && ((n += 4) > 900 || (k -= 3) < -15 ? ClearChild(i) : (SetStyle(i, {

            left: (m += 4) + "px",

            top: k + "px"

          }), oSym.addTask(1, arguments.callee,[n,GetR(k+15),m,k,i,j])))

        }, [f, c, d, b, EditEle(g.BulletEle.cloneNode(false), {

          id: h

        }, 0, EDPZ), a])

      })("StarB" + Math.random());

      (function(h) {

        oSym.addTask(15, function(j) {

          var i = $(j);

          i && SetVisible(i)

        }, [h]);

        oSym.addTask(1, function(n, l, m, k, i, j) {

          j(oZ.getZ0(n, l), 1, i) && ((n += 4) > 900 || (k += 3) > 600 ? ClearChild(i) : (SetStyle(i, {

            left: (m += 4) + "px",

            top: k + "px"

          }), oSym.addTask(1, arguments.callee,[n,GetR(k+15),m,k,i,j])))

        }, [f, c, d, b, EditEle(g.BulletEle.cloneNode(false), {

          id: h

        }, 0, EDPZ), a])

      })("StarB" + Math.random())

    }

  }),

  oPeashooter = InheritO(CPlants, {

    EName: "oPeashooter",

    CName: "Peashooter",

    width: 71,

    height: 71,

    beAttackedPointR: 51,

    SunNum: 100,

    BKind: 0,

    AudioArr: ["splat1", "splat2", "splat3", "plastichit", "shieldhit", "shieldhit2"],

    PicArr: ["images/Card/Plants/Peashooter.png", "images/Plants/Peashooter/0.gif", "images/Plants/Peashooter/Peashooter.gif", "images/Plants/PB00.gif", "images/Plants/PeaBulletHit.gif"],

    Tooltip: "Shoot peas at enemies",

    Produce: 'Peashooter, your first line of defense. They attack zombies by shooting pea</font><br>peas. <p>Damage: <font color="#FF0000">Medium</font></p> How can a plant grow so fast and shoot so many</font><br>peas? Peashooter: “Hard work, dedication, and a balanced mix of sunshine, high fiber and carbon dioxide make this healthy breakfast possible. "',

    PrivateBirth: function(a) {

      a.BulletEle = NewImg(0, a.PicArr[3], "left:" + (a.AttackedLX - 40) + "px;top:" + (a.pixelTop + 3) + "px;visibility:hidden;z-index:" + (a.zIndex + 2))

    },

    PrivateDie: function(a) {

      a.BulletEle = null

    },

    NormalAttack: function() {

      var a = this,

        b = "PB" + Math.random();

      EditEle(a.BulletEle.cloneNode(false), {

        id: b

      }, 0, EDPZ);

      oSym.addTask(15, function(d) {

        var c = $(d);

        c && SetVisible(c)

      }, [b]);

      oSym.addTask(1, function(f, j, h, c, n, i, m, k, o, g) {

        var l, e = GetC(n),

          d = oZ["getZ" + c](n, i);

        m == 0 && g[i + "_" + e] && k != e && (PlayAudio("firepea"), m = 1, h = 40, k = e, j.src = "images/Plants/PB" + m + c + ".gif");

        d && d.Altitude == 1 ? (d[{

          "-1": "getSnowPea",

          0: "getPea",

          1: "getFirePea"

        } [m]](d, h, c), SetStyle(j, {

          left: o + 28 + "px"

        }).src = ["images/Plants/PeaBulletHit.gif", "images/Plants/PeaBulletHit2.gif"][m], oSym.addTask(10, ClearChild, [j])) : (n += l = !c ? 5 : -5) < oS.W && n > 100 ? (j.style.left = (o += l) + "px", oSym.addTask(1, arguments.callee, [f, j, h, c, n, i, m, k, o, g])) : ClearChild(j)

      }, [b, $(b), 20, 0, a.AttackedLX, a.R, 0, 0, a.AttackedLX - 40, oGd.$Torch])

    }

  }),

  oLotusRoot = InheritO(oPeashooter, {

    EName: "oLotusRoot",

    CName: "Lotus Root Rocket Launcher",

    width: 130,

    height: 114,

    beAttackedPointR: 70,

    SunNum: 400,

    BookHandBack: 4.9,

    coolTime: 30,

    getShadow: function(a) {

      return "display:none"

    },

    PicArr: ["images/Card/Plants/LotusRoot.png", "images/Plants/LotusRoot/0.gif", "images/Plants/LotusRoot/Peashooter.gif", "images/Plants/LotusRoot/Missile.png", "images/Plants/LotusRoot/BulletHit.png"],

    Tooltip: "Launch high-power rocket launchers, causing heavy damage to warships and submarines",

    Produce: 'The Lotus Root Rocket Launcher can fire high-power rockets, causing heavy damage to warships and</font><br>submarines. <p>Damage: <font color="#FF0000">Extremely high</font></p> What else can the Lotus Root Rocket Launcher do besides firing shells? Well, </font><br>you should ask someone with trypophobia </font><br> this question. "',

    CanGrow: function(c, b, d) {

      var a = b + "_" + d;

      return !(d < 1 || d > 9 || oGd.$LF[b] - 2 || c[0] || c[1] || oGd.$Crater[a] || oGd.$Tombstones[a])

    },

    PrivateBirth: function(a) {

      a.BulletEle = NewImg(0, a.PicArr[3], "left:" + (a.AttackedLX - 40) + "px;top:" + (a.pixelTop + 3) + "px;visibility:hidden;z-index:" + (a.zIndex + 2))

    },

    PrivateDie: function(a) {

      a.BulletEle = null

    },

    NormalAttack: function() {

      var a = this,

        b = "PB" + Math.random();

      EditEle(a.BulletEle.cloneNode(false), {

        id: b

      }, 0, EDPZ);

      oSym.addTask(15, function(o) {

        $(a.id).childNodes[1].src = "images/Plants/LotusRoot/Peashooter.gif"

      }, [this]);

      oSym.addTask(15, function(d) {

        var c = $(d);

        c && SetVisible(c)

      }, [b]);

      oSym.addTask(1, function(f, j, h, c, n, i, m, k, o, g) {

        var l, e = GetC(n),

          d = oZ["getZ" + c](n, i);

        m == 0 && g[i + "_" + e] && k != e && (PlayAudio("firepea"), m = 1, h = 40, k = e, j.src = "images/Plants/LotusRoot/Missile.png");

        d && d.Altitude == 1 ? (d[{

          "-1": "getSnowPea",

          0: "getPea",

          1: "getFirePea"

        } [m]](d, h, c), SetStyle(j, {

          left: o + 28 + "px"

        }).src = "images/Plants/LotusRoot/BulletHit.png", oSym.addTask(10, ClearChild, [j])) : (n += l = !c ? 5 : -5) < oS.W && n > 100 ? (j.style.left = (o += l) + "px", oSym.addTask(1, arguments.callee, [f, j, h, c, n, i, m, k, o, g])) : ClearChild(j)

      }, [b, $(b), 500, 0, a.AttackedLX, a.R, 0, 0, a.AttackedLX - 40, oGd.$Torch])

    }

  }),

  oSnowPea = InheritO(oPeashooter, {

    EName: "oSnowPea",

    CName: "Ice Shooter",

    SunNum: 175,

    BKind: -1,

    PicArr: ["images/Card/Plants/SnowPea.png", "images/Plants/SnowPea/0.gif", "images/Plants/SnowPea/SnowPea.gif", "images/Plants/PB-10.gif", "images/Plants/PeaBulletHit1.gif"],

    AudioArr: ["frozen", "splat1", "splat2", "splat3", "shieldhit", "shieldhit2", "plastichit"],

    Tooltip: "Ice Archer can cause damage and also has a slowing effect",

    Produce: 'The Ice Shooter launches ice peas to attack enemies and has a</font><br>slowing effect. <p>Damage: <font color="#FF0000">Medium, with slowing effect</font></p> People often tell Ice Archer how "cold" he is, or </font><br>admonish He wants to "calm down." They told him to "keep calm." Cold</font><br>Ice Archer just rolled his eyes. In fact, he heard it all. ',

    NormalAttack: function() {

      var a = this,

        b = "PB" + Math.random();

      EditEle(a.BulletEle.cloneNode(false), {

        id: b

      }, 0, EDPZ);

      oSym.addTask(15, function(d) {

        var c = $(d);

        c && SetVisible(c)

      }, [b]);

      oSym.addTask(1, function(f, j, h, c, n, i, m, k, o, g) {

        var l, e = GetC(n),

          d = oZ["getZ" + c](n, i);

        m < 1 && g[i + "_" + e] && k != e && (PlayAudio("firepea"), ++m && (h = 40), k = e, j.src = "images/Plants/PB" + m + c + ".gif");

        d && d.Altitude == 1 ? (d[{

          "-1": "getSnowPea",

          0: "getPea",

          1: "getFirePea"

        } [m]](d, h, c), SetStyle(j, {

          left: o + 28 + "px"

        }).src = "images/Plants/PeaBulletHit1.gif", oSym.addTask(10, ClearChild, [j])) : (n += l = !c ? 5 : -5) < oS.W && n > 100 ? (j.style.left = (o += l) + "px", oSym.addTask(1, arguments.callee, [f, j, h, c, n, i, m, k, o, g])) : ClearChild(j)

      }, [b, $(b), 30, 0, a.AttackedLX, a.R, -1, 0, a.AttackedLX - 40, oGd.$Torch])

    }

  }),

  oSnowRepeater = InheritO(oSnowPea, {

    EName: "oSnowRepeater",

    CName: "Ice Dual Launcher",

    SunNum: 250,

    PicArr: ["images/Card/Plants/SnowRepeater.png", "images/Plants/SnowRepeater/0.gif", "images/Plants/SnowRepeater/SnowPea.gif", "images/Plants/PB-10.gif", "images/Plants/PeaBulletHit1.gif"],

    Tooltip: "Double-shot Ice Shooter can fire two bullets with a slowing effect",

    Produce: 'Double-shot Ice Shooter fires two bullets with a slowing effect. <p>Damage: <font color="#FF0000">Medium (per shot)</font><br>Fire speed: <font color="#FF0000">Twice</font></p> Double shot Ice Shooter is a shooting enthusiast, and he often tells others how accurate his shooting is. Well, although</font><br>that's not the case. ',

    NormalAttack1: oSnowPea.prototype.NormalAttack,

    NormalAttack: function(a) {

      this.NormalAttack1();

      oSym.addTask(15, function(c) {

        var b = $P[c];

        b && b.NormalAttack1()

      }, [this.id])

    }

  }),

  oRepeater = InheritO(oPeashooter, {

    EName: "oRepeater",

    CName: "Double Launcher",

    width: 73,

    height: 71,

    beAttackedPointR: 53,

    SunNum: 200,

    PicArr: ["images/Card/Plants/Repeater.png", "images/Plants/Repeater/0.gif", "images/Plants/Repeater/Repeater.gif", "images/Plants/PB00.gif", "images/Plants/PeaBulletHit.gif"],

    AudioArr: ["splat1", "splat2", "splat3", "plastichit", "shieldhit", "shieldhit2"],

    Tooltip: "Fire two peas at once",

    Produce: 'Double launchers can launch two peas at once<p>Damage: <font color="#FF0000">Medium (per pea)</font><br>Launch speed: <font color="#FF0000"> Twice</font></p>The double shooter is very fierce. He grew up on the streets. He doesn't </font><br>care about anyone's opinion, whether it's a plant or a zombie, he plucks peas to keep others away from him. In fact, the double</font><br>shooter has been secretly longing for love. ',

    NormalAttack1: oPeashooter.prototype.NormalAttack,

    NormalAttack: function(a) {

      this.NormalAttack1();

      oSym.addTask(15, function(c) {

        var b = $P[c];

        b && b.NormalAttack1()

      }, [this.id])

    }

  }),

  oThreepeater = InheritO(oPeashooter, {

    EName: "oThreepeater",

    CName: "Third-line shooter",

    width: 73,

    height: 80,

    beAttackedPointR: 53,

    SunNum: 325,

    PicArr: ["images/Card/Plants/Threepeater.png", "images/Plants/Threepeater/0.gif", "images/Plants/Threepeater/Threepeater.gif", "images/Plants/PB00.gif", "images/Plants/PeaBulletHit.gif", "images/Plants/PeaBulletHit2.gif"],

    AudioArr: ["splat1", "splat2", "splat3", "plastichit", "shieldhit", "shieldhit2"],

    Tooltip: "Shoot three rows of peas at once",

    Produce: 'Three-line shooters can shoot peas on three lines at the same time. <p>Damage: <font color="#FF0000">Normal (each)</font><br>Range: <font color="#FF0000">Third line</font></p>Third line shooters like reading , playing chess and sitting in the park. He</font><br>also enjoys performing, especially modern jazz. "I'm looking</font><br>for the other half of my life," he said. The favorite number for third-line shooters</font><br>is 5. ',

    getTriggerR: function(a) {

      return [a > 2 ? a - 1 : 1, a < oS.R ? Number(a) + 1 : a]

    },

    PrivateBirth: function(f) {

      var e = f.AttackedLX,

        d = e - 40,

        a, c = f.oTrigger,

        b;

      f.BulletClass = [];

      f.BulletEle = [];

      for (b in c) {

        f.BulletClass.push(NewO({

          X: and,

          R: b,

          D: 0,

          Attack: 20,

          Kind: 0,

          ChangeC: 0,

          pixelLeft: d,

          F: oGd.MB1

        }));

        f.BulletEle.push(NewImg(0, "images/Plants/PB00.gif", "left:" + d + "px;top:" + (GetY(b) - 50) + "px;visibility:hidden;z-index:" + (3 * b + 2)))

      }

    },

    PrivateDie: function(a) {

      a.BulletEle.length = 0

    },

    NormalAttack: function() {

      var a, c = this,

        d, b = 0;

      for (a in c.oTrigger) {

        EditEle(c.BulletEle[b++].cloneNode(false), {

          id: d = "PB" + Math.random()

        }, 0, EDPZ);

        oSym.addTask(15, function(f) {

          var e = $(f);

          and && SetVisible(e)

        }, [d]);

        oSym.addTask(1, function(h, l, j, e, p, k, o, m, q, i) {

          var n, g = GetC(p),

            f = oZ["getZ" + e](p, k);

          o == 0 && i[k + "_" + g] && m != g && (PlayAudio("firepea"), o = 1, j = 40, m = g, l.src = "images/Plants/PB" + o + e + ".gif");

          f && f.Altitude == 1 ? (f[{

            "-1": "getSnowPea",

            0: "getPea",

            1: "getFirePea"

          } [o]](f, j, e), SetStyle(l, {

            left: q + 28 + "px"

          }).src = ["images/Plants/PeaBulletHit.gif", "images/Plants/PeaBulletHit2.gif"][o], oSym.addTask(10, ClearChild, [l])) : (p += n = !e ? 5 : -5) < oS.W && p > 100 ? (l.style.left = (q += n) + "px", oSym.addTask(1, arguments.callee, [h, l, j, e, p, k, o, m, q, i])) : ClearChild(l)

        }, [d, $(d), 20, 0, c.AttackedLX, a, 0, 0, c.AttackedLX - 40, oGd.$Torch])

      }

    }

  }),

  oGatlingPea = InheritO(oPeashooter, {

    EName: "oGatlingPea",

    CName: "Machine Gun Shooter",

    width: 88,

    height: 84,

    beAttackedPointR: 68,

    SunNum: 275,

    PicArr: ["images/Card/Plants/GatlingPea.png", "images/Plants/GatlingPea/0.gif", "images/Plants/GatlingPea/GatlingPea.gif", "images/Plants/PB00.gif", "images/Plants/PeaBulletHit.gif"],

    AudioArr: ["splat1", "splat2", "splat3", "plastichit", "shieldhit", "shieldhit2"],

    Tooltip: "Fire four peas at once<br>",

    Produce: 'The machine gun shooter can fire four peas at once<p>Damage: <font color="#FF0000">Medium (per pea)</font><br>Fire Speed: <font color="#FF0000">Four Times<br>can be planted in dual-shooting hands</font></p>When Gatlin announced that he was going to join the army, his parents were very worried about him. They all said to him in unison: Said: "Honey, </font><br>this is too dangerous." Gatlin refused to give in, "Life is </font><br>dangerous," he replied, with a look in his eyes. , shining with steely faith. ',

    PrivateBirth: function(c) {

      where b = c.AttackedLX,

        a = b - 40;

      c.BulletClass = NewO({

        X: b,

        R: c.R,

        D: 0,

        Attack: 20,

        Kind: c.BKind,

        ChangeC: 0,

        pixelLeft: a,

        F: oGd.MB1

      });

      c.BulletEle = NewImg(0, c.PicArr[3], "left:" + a + "px;top:" + (c.pixelTop + 8) + "px;visibility:hidden;z-index:" + (c.zIndex + 2))

    },

    CanGrow: function(c, b, f) {

      var a = b + "_" + f,

        d = c[1],

        e = oS.ArP;

      return e ? oGd.$LF[b] == 1 ? f > 0 && f < e.ArC[1] && !(oGd.$Crater[a] || oGd.$Tombstones[a] || d) : c[0] && !d : d && d.EName == "oRepeater" ? 1 : oGd.$LF[b] == 1 ? !(f < 1 || f > 9 || oGd.$Crater[a] || oGd.$Tombstones[a] || d) : c[0] && !d

    },

    NormalAttack1: oPeashooter.prototype.NormalAttack,

    NormalAttack: function(a) {

      this.NormalAttack1();

      oSym.addTask(15, function(d, b) {

        var c = $P[d];

        c && c.NormalAttack1();

        --b && oSym.addTask(15, arguments.call,[d,b]);

      }, [this.id, 3])

    }

  }),

  oSplitPea = InheritO(oPeashooter, {

    EName: "oSplitPea",

    CName: "Split Shooter",

    width: 92,

    height: 72,

    beAttackedPointR: 72,

    SunNum: 125,

    PicArr: ["images/Card/Plants/SplitPea.png", "images/Plants/SplitPea/0.gif", "images/Plants/SplitPea/SplitPea.gif", "images/Plants/PB00.gif", "images/Plants/PB01.gif", "images/Plants/PeaBulletHit.gif"],

    AudioArr: ["splat1", "splat2", "splat3", "plastichit", "shieldhit", "shieldhit2"],

    Tooltip: "Launch peas in both directions front and back",

    Produce: 'Split shooter that shoots peas in both directions. <p>Damage: <font color="#FF0000">Medium</font><br>Range: <font color="#FF0000">Front and Rear</font><br>Fire Speed: <font color= "#FF0000">Normal speed in the front, double speed in the back</font></p>Split shooter: "Yes, I am a Gemini. I know,</font><br>This is really surprising . However, having two heads, or actually </font><br>having one head and something similar to a head on the back, </font><br>helped me a lot in my defense on this line. big.',

    GetDX: function() {

      return -55

    },

    getShadow: function(a) {

      return "left:5px;top:" + (a.height - 22) + "px"

    },

    getTriggerRange: function(a, b, c) {

      return [

        [100, b + 25, 1],

        [b + 26, oS.W, 0]

      ]

    },

    PrivateBirth: function(c) {

      var b = c.PicArr,

        a = "px;top:" + (c.pixelTop + 3) + "px;visibility:hidden;z-index:" + (c.zIndex + 2);

      c.BulletEle = [NewImg(0, b[3], "left:" + (c.AttackedLX - 40) + a), NewImg(0, b[4], "left:" + (c.AttackedRX - 16) + a)], c.aTri = [0, 0]

    },

    PrivateDie: function(a) {

      a.BulletEle.length = 0

    },

    TriggerCheck: function(b, a) {

      if (this.aTri[a]) {

        return

      }

      if (this.AttackCheck2(b)) {

        ++this.aTri[a];

        this.aTri[0] && this.aTri[1] && (this.canTrigger = 0);

        this.CheckLoop(b.id, a)

      }

    },

    AttackCheck1: function(b, f) {

      var e = this,

        c = $Z[b],

        a;

      if (c && c.PZ && c.R == e.R) {

        a = c.ZX > e.AttackedLX + 25 ? 0 : 1;

        f == a ? e.AttackCheck2(c) ? e.CheckLoop(b, f) : --e.aTri[f] : (++e.aTri[a], --e.aTri[f])

      } else {

        --e.aTri[f]

      }

      e.canTrigger = e.aTri[0] && e.aTri[1] ? 0 : 1

    },

    CheckLoop: function(a, b) {

      this.NormalAttack(b);

      oSym.addTask(140, function(c, e, g) {

        var f;

        (f = $P[c]) && f.AttackCheck1(e, g)

      }, [this.id, a, b])

    },

    NormalAttack: function(c) {

      var d = this,

        e, a = c ? (oSym.addTask(15, function(f) {

          $P[f] && b(1)

        }, [d.id]), d.AttackedRX - 16) : d.AttackedLX - 40,

        b = function() {

          EditEle(d.BulletEle[c].cloneNode(false), {

            id: e = "PB" + Math.random()

          }, 0, EDPZ);

          oSym.addTask(15, function(g) {

            var f = $(g);

            f && SetVisible(f)

          }, [e]);

          oSym.addTask(1, function(i, m, k, f, q, l, p, n, r, j) {

            var o, h = GetC(q),

              g = oZ["getZ" + f](q, l);

            p == 0 && j[l + "_" + h] && n != h && (PlayAudio("firepea"), p = 1, k = 40, n = h, m.src = "images/Plants/PB" + p + f + ".gif");

            g && g.Altitude == 1 ? (g[{

              "-1": "getSnowPea",

              0: "getPea",

              1: "getFirePea"

            } [p]](g, k, f), SetStyle(m, {

              left: r + 28 + "px"

            }).src = ["images/Plants/PeaBulletHit.gif", "images/Plants/PeaBulletHit2.gif"][m], oSym.addTask(10, ClearChild, [m])) : (q += o = !f ? 5 : -5) < oS.W && q > 100 ? (m.style.left = (r += o) + "px", oSym.addTask(1, arguments.callee, [i, m, k, f, q, l, p, n, r, j])) : ClearChild(m)

          }, [e, $(e), 20, c, d.AttackedLX, d.R, 0, 0, a, oGd.$Torch])

        };

      b()

    }

  }),

  oSunFlower = InheritO(CPlants, {

    EName: "oSunFlower",

    CName: "Sunflower",

    width: 73,

    height: 74,

    beAttackedPointR: 53,

    SunNum: 50,

    PicArr: ["images/Card/Plants/SunFlower.png", "images/Plants/SunFlower/0.gif", "images/Plants/SunFlower/SunFlower1.gif", "images/Plants/SunFlower/SunFlower.gif"],

    Tooltip: "Sunflowers, a basic crop that produces more sunlight for you. Plant as many as you can!",

    Produce: 'Sunflower, a cash crop that produces extra sunlight for you. Try</font><br>to plant as many as you can! <p>Sunlight Yield: <font color="#FF0000">Medium</font></p> The sunflowers can’t help but dance to the beat. What beat</font><br>is it? Hi, it's the jazz beat that the earth itself uses to refresh yourself. Only sunflowers can hear this frequency beat. ',

    BirthStyle: function(c, e, b, a) {

      var d = b.childNodes[1];

      d.src = "images/Plants/SunFlower/SunFlower.gif";

      d.style.clip = "rect(0,auto,74px,0)";

      d.style.height = "148px";

      EditEle(b, {

        id: e

      }, a, EDPZ)

    },

    ChangePosition: function(c, a) {

      var b = c.childNodes[1];

      a ? SetStyle(b, {

        clip: "rect(74px,auto,auto,auto)",

        top: "-74px"

      }) : SetStyle(b, {

        clip: "rect(auto,auto,74px,auto)",

        top: 0

      })

    },

    PrivateBirth: function(a) {

      oS.ProduceSun ? oSym.addTask(500, function(d, c, b) {

        $P[d] &&(a.ChangePosition($(d), 1), oSym.addTask(100, function(h, g, f, e) {

          $P[h] &&(AppearSun(Math.floor(g + Math.random() * 41), f, 50, 0), oSym.addTask(100, function(i) {;

            $P[i] && a.ChangePosition($(i), 0)

          }, [h]), oSym.addTask(2400, e, [h, g, f]))

        }, [d, c, b, arguments.callee]))

      }, [a.id, GetX(a.C) - 40, GetY(a.R)]) : a.getHurt = function(f, c, b) {

        var e = this;

        switch (c) {

          case 0:

            var d = e.HP -= b;

            !(d % 100) && (AppearSun(Math.floor(GetX(eC) - 40 + Math.random() * 41), GetY(eR), 25, 0), oSym.addTask(50, function(h, 25, 0); g) {

              AppearSun(Math.floor(GetX(h) - 40 + Math.random() * 41), GetY(g), 25, 0)

            }, [e.C, e.R]), d < 1 ? e.Die() : oSym.addTask(50, function(h, g) {

              AppearSun(Math.floor(GetX(h) - 40 + Math.random() * 41), GetY(g), 25, 0)

            }, [e.C, e.R]));

            break;

          case 3:

            (e.HP -= b) < 1 && e.Die();

            break;

          default:

            e.Die(1)

        }

      }

    },

    InitTrigger: function() {}

  }),

  oTwinSunflower = InheritO(oSunFlower, {

    EName: "oTwinSunflower",

    CName: "Twin Sunflower",

    width: 83,

    height: 84,

    beAttackedPointR: 63,

    SunNum: 150,

    PicArr: ["images/Card/Plants/TwinSunflower.png", "images/Plants/TwinSunflower/0.gif", "images/Plants/TwinSunflower/TwinSunflower1.gif", "images/Plants/TwinSunflower/TwinSunflower.gif"],

    Tooltip: "Twin sunflowers produce twice as much sunlight as ordinary sunflowers<br>",

    Produce: 'Twin sunflowers produce twice as much sunlight as regular sunflowers. <p>Sunlight yield: <font color="#FF0000">Double<br>Can be planted on ordinary sunflowers</font></p>It was a crazy night, forbidden science and technology, let double</p> font><br>Sunflower came to this world. The lightning, thunder, and roaring wind</font><br>are all expressions of the world's rejection of him. But all to no avail, Twin Sunflowers are still alive! ',

    CanGrow: function(c, b, f) {

      var a = b + "_" + f,

        d = c[1],

        e = oS.ArP;

      return e ? oGd.$LF[b] == 1 ? f > 0 && f < e.ArC[1] && !(oGd.$Crater[a] || oGd.$Tombstones[a] || d) : c[0] && !d : d && d.EName == "oSunFlower" ? 1 : oGd.$LF[b] == 1 ? !(f < 1 || f > 9 || oGd.$Crater[a] || oGd.$Tombstones[a] || d) : c[0] && !d

    },

    BirthStyle: function(c, e, b, a) {

      var d = b.childNodes[1];

      d.src = "images/Plants/TwinSunflower/TwinSunflower.gif";

      d.style.clip = "rect(0,auto,84px,0)";

      d.style.height = "168px";

      EditEle(b, {

        id: e

      }, a, EDPZ)

    },

    ChangePosition: function(c, a) {

      var b = c.childNodes[1];

      a ? SetStyle(b, {

        clip: "rect(84px,auto,auto,auto)",

        top: "-84px"

      }) : SetStyle(b, {

        clip: "rect(auto,auto,84px,auto)",

        top: 0

      })

    },

    PrivateBirth: function(a) {

      var b = GetX(a.C);

      oSym.addTask(500, function(f, d, c, e) {

        $P[f] && (a.ChangePosition($(f), 1), oSym.addTask(100, function(k, h, g, j, i) {

          AppearSun(Math.floor(h + Math.random() * 21), j, 50, 0), AppearSun(Math.floor(g + Math.random() * 21), j, 50, 0), oSym.addTask(100, function(l) {

            $P[l] && a.ChangePosition($(l), 0)

          }, [k]), oSym.addTask(2400, i, [k, h, g, j])

        }, [f, d, c, e, arguments.call]))

      }, [a.id, b - 40, b - 20, GetY(a.R)])

    }

  }),

  oPumpkinHead = InheritO(CPlants, {

    EName: "oPumpkinHead",

    CName: "Pumpkin Head",

    width: 97,

    height: 67,

    beAttackedPointL: 15,

    beAttackedPointR: 82,

    SunNum: 125,

    PKind: 2,

    HP: 4e3,

    coolTime: 30,

    zIndex: 1,

    PicArr: ["images/Card/Plants/PumpkinHead.png", "images/Plants/PumpkinHead/0.gif", "images/Plants/PumpkinHead/PumpkinHead.gif", "images/Plants/PumpkinHead/PumpkinHead1.gif", "images/Plants/PumpkinHead/PumpkinHead2.gif", "images/Plants/PumpkinHead/pumpkin_damage1.gif", "images/Plants/PumpkinHead/pumpkin_damage2.gif", "images/Plants/PumpkinHead/Pumpkin_back.gif"],

    Tooltip: "Pumpkinhead can protect other plants with his shell.",

    Produce: 'Pumpkinhead, who can protect other plants with his shell. <p>Toughness: <font color="#FF0000">High</font><br>Features: <font color="#FF0000">Can be planted on other plants</font></p>Pumpkin Head Recently I haven't received any news about his cousin Renfield. Obviously, Edgefield is a big star, a kind of...</font><br>What kind of sport is called...a sports star? Peg Jump Ball Master</font><br>Master? Pumpkinhead doesn't understand what sport is anyway, he just wants to do his job well. ',

    CanGrow: function(c, b, d) {

      var a = b + "_" + d;

      return c[2] ? 1 : oGd.$LF[b] == 1 ? !(d < 1 || d > 9 || oGd.$Crater[a] || oGd.$Tombstones[a]) : c[0]

    },

    GetDY: function(b, c, a) {

      return a[0] ? -12 : -5

    },

    HurtStatus: 0,

    getHurt: function(e, c, b) {

      var d = this,

        f = d.id,

        a = $(f);

      switch (true) {

        case c && c < 3:

          d.Die(1);

          break;

        case (d.HP -= b) < 1:

          d.Die();

          break;

        case d.HP < 1334:

          d.HurtStatus < 2 && (d.HurtStatus = 2, a.childNodes[1].src = "images/Plants/PumpkinHead/pumpkin_damage2.gif");

          break;

        case d.HP < 2667:

          d.HurtStatus < 1 && (d.HurtStatus = 1, a.childNodes[1].src = "images/Plants/PumpkinHead/pumpkin_damage1.gif", $(f + "_2").src = "images/Plants/PumpkinHead/Pumpkin_back.gif")

      }

    },

    InitTrigger: function() {},

    BirthStyle: function(c, d, b, a) {

      b.childNodes[1].src = "images/Plants/PumpkinHead/PumpkinHead1.gif";

      EditEle(b, {

        id: d

      }, a, EDPZ);

      NewImg(d + "_2", "images/Plants/PumpkinHead/PumpkinHead2.gif", "left:" + c.pixelLeft + "px;top:" + c.pixelTop + "px;z-index:" + (c.zIndex - 2), EDPZ)

    },

    PrivateDie: function(a) {

      ClearChild($(a.id + "_2"))

    }

  }),

  oFlowerPot = InheritO(CPlants, {

    EName: "oFlowerPot",

    CName: "Flower Pot",

    width: 72,

    height: 68,

    beAttackedPointR: 52,

    SunNum: 25,

    BookHandBack: 6,

    HP: 1e3,

    PicArr: ["images/Card/Plants/FlowerPot.png", "images/Plants/FlowerPot/0.gif", "images/Plants/FlowerPot/FlowerPot.gif"],

    PKind: 0,

    Stature: -1,

    GetDY: function(b, c, a) {

      return 6

    },

    CanGrow: function(e, d, f) {

      var c = d + "_" + f,

        b = oGd.$LF[d],

        a = f < 1 || f > 9;

      return b % 2 ? b < 3 ? !(a || e[1] || e[2] || e[0] || oGd.$Crater[c] || oGd.$Tombstones[c]) : !(a || e[0] || oGd.$Crater[c]) : 0

    },

    Tooltip: "Plants can be planted on the roof",

    Produce: 'Plants allow you to grow plants on your roof. <p>Features: <font color="#FF0000">Allows you to plant on the roof</font></p> "I am a flowerpot for plants to grow, but I am also a tree</font><br >Plants. Isn't that surprising?',

    InitTrigger: function() {}

  }),

  oCFlowerPot = InheritO(oFlowerPot, {

    EName: "oCFlowerPot",

    PicArr: ["images/Card/Plants/CFlowerPot.png", "images/Plants/FlowerPot/C/0.gif", "images/Plants/FlowerPot/C/CFlowerPot.gif"],

    Produce: "Plants can be planted on tiled terrain. </font></p> Celadon flowerpots need no introduction."

  }),

  oLilyPad = InheritO(oFlowerPot, {

    BookHandBack: 4.9,

    Stature: -1,

    EName: "oLilyPad",

    CName: "Lotus Leaf",

    width: 79,

    height: 58,

    beAttackedPointR: 59,

    HP: 1e3,

    PicArr: ["images/Card/Plants/LilyPad.png", "images/Plants/LilyPad/0.gif", "images/Plants/LilyPad/LilyPad.gif"],

    getShadow: function(a) {

      return "left:-8px;top:25px"

    },

    CanGrow: function(c, b, d) {

      var a = b + "_" + d;

      return !(d < 1 || d > 9 || oGd.$LF[b] - 2 || c[0] || c[1] || oGd.$Crater[a] || oGd.$Tombstones[a])

    },

    Tooltip: "Lotus leaves allow you to grow non-aquatic plants on them.",

    Produce: 'Lily Leaf allows you to grow non-aquatic plants on top of it. <p>Features:<font color="#FF0000">Non-aquatic plants can be planted on it<br>Must be planted on the water surface</font></p>The lotus leaf never complains, and it never wants to know what happened What</font><br>thing. Plant a plant on it and it won't say anything. Could it</font><br>do it have any surprising ideas or terrible secrets? No one</font><br>knows. Lotus Ye buries all these in her heart. '

  }),

  oLilyPad1 = InheritO(oLilyPad, {

    EName: "oLilyPad1"

  }),

  oPotatoMine = InheritO(CPlants, {

    EName: "oPotatoMine",

    CName: "Potato Thunder",

    width: 75,

    height: 55,

    beAttackedPointR: 55,

    SunNum: 25,

    coolTime: 30,

    Stature: -1,

    HP: 1e3,

    CanGrow: function(c, b, e) {

      var a = b + "_" + e,

        d = oS.ArP;

      return d ? oGd.$LF[b] == 1 ? e > 0 && e < d.ArC[1] && !(oGd.$Crater[a] || oGd.$Tombstones[a] || c[1]) : c[0] && !c[1] : oGd.$LF[b] == 1 ? !(e < 1 || e > 9 || oGd.$Crater[a] || oGd.$Tombstones[a] || c[1]) : c[0] && !c[1]

    },

    PicArr: ["images/Card/Plants/PotatoMine.png", "images/Plants/PotatoMine/0.gif", "images/Plants/PotatoMine/PotatoMine.gif", "images/Plants/PotatoMine/PotatoMineNotReady.gif", "images/Plants/PotatoMine/PotatoMine_mashed.gif", "images/Plants/PotatoMine/ExplosionSpudow.gif"],

    Tooltip: "Explodes upon contact with the enemy<br>It takes time to settle",

    Produce: 'Potato mines are powerful, but they need time</font><br>to arm themselves. You should plant them in the path of zombies </font><br>so that they will explode when touched. <p>Damage: <font color="FF0000">Huge</font><br>Range: <font color="#FF0000">All zombies in a small area</font><br>Usage: <font color="#FF0000">Used alone, it requires some preparation time. </font></p>Some people say that Potato Ray is lazy because he always leaves everything </font><br>to last. Tudou Lei had no time to pay attention to them. He was busy thinking about his investment strategy. ',

    Status: 0,

    AudioArr: ["potato_mine"],

    canTrigger: 0,

    BirthStyle: function(d, e, c, b, a) {

      c.childNodes[1].src = !a ? "images/Plants/PotatoMine/PotatoMineNotReady.gif" : (~ function() {

        d.Status = 1;

        d.canTrigger = 1;

        d.getHurt = d.getHurt2

      }(), "images/Plants/PotatoMine/PotatoMine.gif");

      EditEle(c, {

        id: e

      }, b, EDPZ)

    },

    getHurt2: function(d, b, a) {

      var c = this;

      b > 2 ? (c.HP -= a) < 1 && c.Die() : c.NormalAttack(c.pixelLeft, c.pixelRight, c.R)

    },

    PrivateBirth: function(b, a) {

      !a && oSym.addTask(1500, function(d) {

        var c = $P[d];

        c && ($(d).childNodes[1].src = "images/Plants/PotatoMine/PotatoMine.gif", c.Status = 1, c.canTrigger = 1, c.getHurt = c.getHurt2)

      }, [b.id])

    },

    getTriggerRange: function(a, b, c) {

      return [

        [b, c, 0]

      ]

    },

    TriggerCheck: function(e, c) {

      var a = this.R,

        b = this.C;

      e.beAttacked && e.Altitude < 2 && !oGd.$[a + "_" + b + "_2"] && this.NormalAttack(this.pixelLeft, this.pixelRight, this.R)

    },

    NormalAttack: function(j, h, e) {

      var g = this,

        b = g.id,

        d = $(b),

        c = oZ.getArZ(j, h, e),

        f = c.length,

        a;

      while (f--) {

        (a = c[f]).Altitude < 2 && a.getThump()

      }

      g.Die(1);

      PlayAudio("potato_mine");

      EditEle(d.childNodes[1], {

        src: "images/Plants/PotatoMine/PotatoMine_mashed.gif"

      }, {

        width: "132px",

        height: "93px",

        left: "-40px",

        top: "-20px"

      });

      NewImg(0, "images/Plants/PotatoMine/ExplosionSpudow.gif", "left:-90px;top:-40px", d);

      oSym.addTask(200, function(i) {

        ClearChild(i.lastChild);

        oSym.addTask(100, ClearChild, [i])

      }, [d])

    }

  }),

  oTorchwood = InheritO(CPlants, {

    EName: "oTorchwood",

    CName: "Torch Stump",

    width: 73,

    height: 83,

    beAttackedPointR: 53,

    SunNum: 175,

    PicArr: ["images/Card/Plants/Torchwood.png", "images/Plants/Torchwood/0.gif", "images/Plants/Torchwood/Torchwood.gif", "images/Plants/PB00.gif", "images/Plants/PB01.gif", "images/Plants/PB10.gif", "images/Plants/PB11.gif", "images/Plants/Torchwood/SputteringFire.gif"],

    AudioArr: ["firepea", "ignite", "ignite2"],

    Tooltip: "The Torch Stump turns peas that pass through it into fireballs, causing the peas to deal twice as much damage.",

    Produce: 'Torch Stump can turn peas that pass through it into fireballs, dealing </font><br>double damage. <p>Features:<font color="#FF0000">Causes fireballs that pass through him to deal twice the damage. Fireballs also </font><br>deal splash damage to nearby zombies </font><br></font></p> Everyone loves and respects Torch Stumps. They like his</font><br>honesty and steadfast friendship, as well as his ability to enhance pea damage. </font><br>But he also has his own secret: he is illiterate! ',

    PrivateBirth: function(c) {

      var a = cR,

        b = c.C;

      oGd.$Torch[a + "_" + b] = c.id;

      oS.HaveFog && oGd.GatherFog(a, b, 1, 1, 0)

    },

    InitTrigger: function() {},

    PrivateDie: function(c) {

      var a = cR,

        b = c.C;

      delete oGd.$Torch[a + "_" + b];

      oS.HaveFog && oGd.GatherFog(a, b, 1, 1, 1)

    },

    NormalAttack: function() {

      var a = this,

        b = "PB" + Math.random();

      EditEle(a.BulletEle.cloneNode(false), {

        id: b

      }, 0, EDPZ);

      oSym.addTask(15, function(d) {

        var c = $(d);

        c && SetVisible(c)

      }, [b]);

      oSym.addTask(1, function(f, j, h, c, n, i, m, k, o, g) {

        var l, e = GetC(n),

          d = oZ["getZ" + c](n, i);

        m == 0 && g[i + "_" + e] && k != e && (PlayAudio("firepea"), m = 1, h = 40, k = e, j.src = "images/Plants/PB" + m + c + ".gif");

        d && d.Altitude == 1 ? (d[{

          "-1": "getSnowPea",

          0: "getPea",

          1: "getFirePea"

        } [m]](d, h, c), SetStyle(j, {

          left: o + 28 + "px"

        }).src = "images/Plants/PeaBulletHit2.gif", oSym.addTask(75, ClearChild, [j])) : (n += l = !c ? 5 : -5) < oS.W && n > 100 ? (j.style.left = (o += l) + "px", oSym.addTask(1, arguments.callee, [f, j, h, c, n, i, m, k, o, g])) : ClearChild(j)

      }, [b, $(b), 20, 0, a.AttackedLX, a.R, 0, 0, a.AttackedLX - 40, oGd.$Torch])

    }

  }),

  oWallNut = InheritO(CPlants, {

    EName: "oWallNut",

    CName: "Nut Wall",

    width: 65,

    height: 73,

    beAttackedPointR: 45,

    SunNum: 50,

    coolTime: 15.5,

    HP: 4e3,

    PicArr: ["images/Card/Plants/WallNut.png", "images/Plants/WallNut/0.gif", "images/Plants/WallNut/WallNut.gif", "images/Plants/WallNut/Wallnut_cracked1.gif", "images/Plants/WallNut/Wallnut_cracked2.gif"],

    Tooltip: "Nut walls have a hard shell that protects other plants.",

    Produce: 'Nut walls have a hard enough</font><br>shell that you can use to protect other plants. <p>Toughness: <font color="FF0000">High</font></p> Nut Wall: "People want to know what it feels like to be constantly nibbled on by zombies</font><br>? They don't know, I My limited senses can only make me</font><br>feel a numbing feeling, like a relaxing back massage."',

    CanGrow: function(c, b, f) {

      var a = b + "_" + f,

        d = c[1],

        e = oS.ArP;

      return e ? oGd.$LF[b] == 1 ? f > 0 && f < e.ArC[1] && !(oGd.$Crater[a] || oGd.$Tombstones[a] || d) : c[0] && !d : d && d.EName == "oWallNut" ? 1 : oGd.$LF[b] == 1 ? !(f < 1 || f > 9 || oGd.$Crater[a] || oGd.$Tombstones[a] || d) : c[0] && !d

    },

    InitTrigger: function() {},

    HurtStatus: 0,

    getHurt: function(e, b, a) {

      var c = this,

        d = $(c.id).childNodes[1];

      !(b % 3) ? (c.HP -= a) < 1 ? c.Die() : c.HP < 1334 ? c.HurtStatus < 2 && (c.HurtStatus = 2, d.src = "images/Plants/WallNut/Wallnut_cracked2.gif") : c.HP < 2667 && c.HurtStatus < 1 && (c.HurtStatus = 1, d.src = "images/Plants/WallNut/Wallnut_cracked1.gif"): c.Die(1)

    }

  }),

  oLing = InheritO(oWallNut, {

    EName: "oLing",

    CName: "Nanhu Ling",

    width: 90,

    height: 72,

    beAttackedPointL: 15,

    beAttackedPointR: 80,

    BookHandBack: 4.9,

    HP: 1e4,

    getShadow: function(a) {

      return "display:none"

    },

    PicArr: ["images/Card/Plants/Ling.png", "images/Plants/Ling/0.gif", "images/Plants/Ling/Ling.gif"],

    Tooltip: "Nanhu Ling is the first obstacle in the water",

    Produce: 'Nanhu Ling is the first obstacle in the water. <p>Toughness: <font color="FF0000">High</font></p>Look, how big a cashew nut is. Someone said this to Nan Huling again today, but he didn't care. . Nan Huling only </font><br>thinks about one thing every day in her head: "If Qianlong didn't open the Golden Mouth, wouldn't I be able to use </font><br>the horn to stab zombies?!"',

    CanGrow: function(c, b, d) {

      var a = b + "_" + d;

      return !(d < 1 || d > 9 || oGd.$LF[b] - 2 || c[0] || c[1] || oGd.$Crater[a] || oGd.$Tombstones[a])

    },

    getHurt: function(e, b, a) {

      var c = this,

        d = $(c.id).childNodes[1];

      !(b % 3) ? (c.HP -= a) < 1 ? c.Die() : c.HP < 1334 ? c.HurtStatus < 2 && (c.HurtStatus = 2, d.src = "images/Plants/Ling/Ling.gif") : c.HP < 2667 && c.HurtStatus < 1 && (c.HurtStatus = 1, d.src = "images/Plants/Ling/Ling.gif"): c.Die(1)

    }

  }),

  oNutBowling = InheritO(CPlants, {

    EName: "oNutBowling",

    CName: "Nut Bowling",

    width: 71,

    height: 71,

    beAttackedPointL: 10,

    beAttackedPointR: 61,

    SunNum: 0,

    HP: 4e3,

    coolTime: 0,

    canEat: 0,

    Tooltip: "",

    PicArr: ["images/Card/Plants/WallNut.png", "images/Plants/WallNut/0.gif", "images/Plants/WallNut/WallNutRoll.gif"],

    AudioArr: ["bowling", "bowlingimpact", "bowlingimpact2"],

    Produce: "",

    CanAttack: 1,

    InitTrigger: function() {},

    getHurt: function() {},

    CanGrow: function(d, e, f) {

      return true

    },

    NormalAttack: null,

    PrivateBirth: function(c) {

      var d = $(c.id);

      PlayAudio("bowling");

      (function(z, y, q, r, p, x, e, g, b) {

        var a = zR,

          l = z.C,

          A, u, s, v = 0,

          w, i, t = false;

        if (z.CanAttack && (A = oZ.getZ0(r, a)) && A.getCrushed(z)) {

          u = A.id;

          PlayAudio(["bowlingimpact", "bowlingimpact2"][Math.floor(Math.random() * 2)]);

          switch (A.Ornaments) {

            case 0:

              A.NormalDie();

              break;

            case 1:

              A.getHit0(A, Math.min(A.OrnHP, 900), 0);

              break;

            default:

              z.side ? A.Normaldie() : A.CheckOrnHP(A, u, A.OrnHP, 400, A.PicArr, 0, 0, 0)

          }

          z.CanAttack = 0;

          switch (a) {

            case oS.R:

              e = -1;

              break;

            case 1:

              e = 1;

              break;

            default:

              switch (e) {

                case 1:

                  e = -1;

                  break;

                case -1:

                  e = 1;

                  break;

                default:

                  e = Math.random() > .5 ? 1 : -1

              }

          }

          oSym.addTask(1, arguments.callee, [z, y, z.AttackedLX + 20, z.AttackedRX + 20, z.pixelLeft + 20, x, e, g, b])

        } else {

          switch (e) {

            case 1:

              z.pixelBottom + 2 > b && (e = -1);

              break;

            case -1:

              z.pixelBottom - 2 < g && (e = 1);

              break

          }

          q > y ? z.Die() : (i = GetC(z.pixelRight += 2), z.AttackedLX = q += 2, z.AttackedRX = r += 2, w = GetR(z.pixelBottom += e * 2), SetStyle(x, {

            left: (z.pixelLeft = p += 2) + "px",

            top: (z.pixelTop += e * 2) + "px"

          }), w != a && (z.R = w, t = true, !z.CanAttack && (z.CanAttack = 1)), i != l && (z.C = i, t = true), t && (oGd.del({

            R: a,

            C:l,

            PKind: 1

          }), oGd.add(z, w + "_" + i + "_1")), oSym.addTask(1, arguments.callee, [z, y, z.AttackedLX, z.AttackedRX, z.pixelLeft, x, e, g, b]))

        }

      })(c, oS.W, c.AttackedLX, c.AttackedRX, c.pixelLeft, d, 0, GetY1Y2(1)[0], 600)

    }

  }),

  oHugeNutBowling = InheritO(oNutBowling, {

    EName: "oHugeNutBowling",

    CName: "Giant Nut Bowling",

    width: 142,

    height: 142,

    beAttackedPointL: 5,

    beAttackedPointR: 137,

    HP: 8e3,

    Stature: 1,

    PicArr: ["images/Card/Plants/HugeWallNut.png", "images/Plants/WallNut/2.gif", "images/Plants/WallNut/HugeWallNutRoll.gif"],

    PrivateBirth: function(a) {

      PlayAudio("bowling");

      (function(b, c, n, m, e, g) {

        var d = oZ.getArZ(n, m, e),

          f = d.length,

          k, j, l = b.R,

          h = b.C;

        while (f--) {

          (k = d[f]).getCrushed(b) && k.CrushDie()

        }

        n > c ? b.Die() : (j = GetC(b.pixelRight += 2), b.AttackedLX = n += 2, b.AttackedRX = m += 2, g.style.left = (b.pixelLeft += 2) + "px", j != h && (b.C = j, oGd.del({

          R: l,

          C: h,

          PKind: 1

        }), oGd.add(b, l + "_" + j + "_1")), oSym.addTask(1, arguments.callee, [b, c, n, m, e, g]))

      })(a, oS.W, a.AttackedLX, a.AttackedRX, a.R, $(a.id))

    }

  }),

  oBoomNutBowling = InheritO(oNutBowling, {

    EName: "oBoomNutBowling",

    CName: "Exploding Nuts",

    PicArr: ["images/Card/Plants/BoomWallNut.png", "images/Plants/WallNut/1.gif", "images/Plants/WallNut/BoomWallNutRoll.gif", "images/Plants/CherryBomb/Boom.gif"],

    AudioArr: ["cherrybomb", "bowling"],

    PrivateBirth: function(a) {

      PlayAudio("bowling");

      (function(s, q, b, c, m) {

        var v = s.R,

          p = s.C,

          t, l;

        if ((t = oZ.getZ0(c, v)) && t.getCrushed(s)) {

          var j = v > 2 ? v - 1 : 1,

            g = v < oS.R ? v + 1 : oS.R,

            u = s.pixelLeft - 80,

            r = s.pixelLeft + 160,

            e, k;

          PlayAudio("cherrybomb");

          do {

            k = (e = oZ.getArZ(u, r, j)).length;

            while (k--) {

              e[k].ExplosionDie()

            }

          } while (j++ < g);

          s.Die(1);

          EditEle(m.childNodes[1], {

            src: "images/Plants/CherryBomb/Boom.gif"

          }, {

            width: "213px",

            height: "160px",

            left: "-50px",

            top: "-30px"

          });

          oSym.addTask(65, ClearChild, [m])

        } else {

          b > q ? s.Die() : (l = GetC(s.pixelRight += 2), s.AttackedLX = b += 2, s.AttackedRX = c += 2, SetStyle(m, {

            left: (s.pixelLeft += 2) + "px"

          }), l != p && (sC = l, orGd.del({

            R: v,

            C: p,

            PKind: 1

          }), oGd.add(s, v + "_" + l + "_1")), oSym.addTask(1, arguments.callee, [s, q, s.AttackedLX, s.AttackedRX, m]))

        }

      })(a, oS.W, a.AttackedLX, a.AttackedRX, $(a.id))

    }

  }),

  oTallNut = InheritO(oWallNut, {

    EName: "oTallNut",

    CName: "High Nut",

    width: 83,

    height: 119,

    beAttackedPointR: 63,

    SunNum: 125,

    HP: 8e3,

    coolTime: 24.5,

    PicArr: ["images/Card/Plants/TallNut.png", "images/Plants/TallNut/0.gif", "images/Plants/TallNut/TallNut.gif", "images/Plants/TallNut/TallnutCracked1.gif", "images/Plants/TallNut/TallnutCracked2.gif"],

    Tooltip: "A solid barrier that cannot be jumped over",

    Produce: 'Tall nuts are heavy barrier plants and will not be jumped over. <p>Resilience: <font color="#FF0000">Very high</font><br>Special: <font color="#FF0000">will not be stepped over or over</font></p> People Wondering, if nut wall and tall nut are competing. Gao</font><br>Nuts laughed loudly in a baritone voice. "How can there be competition between us? We are buddies. Do you know what Nut Wall has done for me..." Gao Nut's voice became smaller and smaller. , </font><br>He smiled slyly. "',

    CanGrow: function(c, b, f) {

      var a = b + "_" + f,

        d = c[1],

        e = oS.ArP;

      return e ? oGd.$LF[b] == 1 ? f > 0 && f < e.ArC[1] && !(oGd.$Crater[a] || oGd.$Tombstones[a] || d) : c[0] && !d : d && d.EName == "oTallNut" ? 1 : oGd.$LF[b] == 1 ? !(f < 1 || f > 9 || oGd.$Crater[a] || oGd.$Tombstones[a] || d) : c[0] && !d

    },

    Stature: 1,

    getHurt: function(e, b, a) {

      var c = this,

        d = $(c.id).childNodes[1];

      !(b % 3) ? (c.HP -= a) < 1 ? c.Die() : c.HP < 2667 ? c.HurtStatus < 2 && (c.HurtStatus = 2, d.src = "images/Plants/TallNut/TallnutCracked2.gif") : c.HP < 5333 && c.HurtStatus < 1 && (c.HurtStatus = 1, d.src = "images/Plants/TallNut/TallnutCracked1.gif"): c.Die(1)

    }

  }),

  oTenManNut = InheritO(CPlants, {

    EName: "oTenManNut",

    CName: "Vine Nut",

    width: 155,

    height: 130,

    beAttackedPointL: 63,

    beAttackedPointR: 75,

    SunNum: 150,

    HP: 11e3,

    Stature: 1,

    canEat: 1,

    PicArr: ["images/Card/Plants/TenManNut.png", "images/Plants/TenManNut/0.gif", "images/Plants/TenManNut/Spikeweed.gif"],

    Attack: 40,

    Supply: {},

    Tooltip: "Can attack zombies at close range",

    Produce: 'Can attack zombies at close range<p>Damage: <font color="#FF0000">Normal</font><br>Strength: <font color="#FF0000">Very high</font></p >Everyone has been questioning the special relationship between Gao Nut and Nut. It was </font><br>that Gao Nut found his vine, and this rumor was dispelled. ',

    getHurt: function(f, c, b) {

      var e = this,

        d, a = $(e.id).childNodes[1];

      switch (c) {

        case 2:

          f.flatTire();

          break;

        case 1:

          f.getHit2(f, 40, 0)

      }

      switch (true) {

        case (d = e.HP -= b) < 1:

          e.Die();

          break;

        case d < 101:

          a.src = "images/Plants/TenManNut/Spikeweed.gif";

          break;

        case d < 201:

          a.src = "images/Plants/TenManNut/Spikeweed.gif"

      }

    },

    NormalAttack: function(b, a) {

      var c = $Z[b];

      c.getHit2(c, this.Attack, 0)

    },

    getTriggerRange: function(a, b, c) {

      return [

        [this.pixelLeft - 80, this.pixelRight + 80, 0]

      ]

    },

    TriggerCheck: function(i, h) {

      var c = i.id,

        g = this.ArZ,

        a, b, e, f;

      i.PZ && !g[c] && (a = i.AttackedLX, b = i.AttackedRX, e = this.AttackedLX, f = this.AttackedRX, a <= f && a >= e || b <= f && b >= e || a <= e && b >= f) && this.AttackCheck2(i) && (g[c] = 1, this.NormalAttack(c), oSym.addTask(100, function(d, j) {

        var k = $P[d];

        k && delete k.ArZ[j]

      }, [this.id, c]))

    },

    AttackCheck2: function(a) {

      return a.Altitude == 1 && a.beAttacked

    }

  }),

  oCherryBomb = InheritO(CPlants, {

    EName: "oCherryBomb",

    CName: "Cherry Bomb",

    width: 112,

    height: 81,

    beAttackedPointR: 92,

    SunNum: 150,

    coolTime: 20,

    PicArr: ["images/Card/Plants/CherryBomb.png", "images/Plants/CherryBomb/0.gif", "images/Plants/CherryBomb/CherryBomb.gif", "images/Plants/CherryBomb/Boom.gif" + $Random],

    AudioArr: ["cherrybomb"],

    Tooltip: "Blow up all zombies in a certain area",

    Produce: 'Cherry bomb, which can blow up all zombies in a certain area. They</font><br>will detonate immediately once they are released. So please plant them next to the zombies</font><br>s. <p>Damage: <font color="#FF0000">Huge</font><br>Range: <font color="#FF0000">All zombies in a medium area</font><br>Usage: <font color="#FF0000">Used alone, it explodes immediately</font></p> "I'm going to 'explode'." Cherry No. 1 said. "No, we </font><br>'exploded'!" said its brother Cherry No. 2. After intense discussion</font><br>they finally agreed on the term "explosion."',

    InitTrigger: function() {},

    getHurt: function() {},

    PrivateBirth: function(a) {

      oSym.addTask(40, function(b) {

        var c = $P[b];

        if (c) {

          PlayAudio("cherrybomb");

          var f = $(b),

            j = c.R,

            g = j > 2 ? j - 1 : 1,

            e = j < oS.R ? j + 1 : oS.R,

            l = c.pixelLeft - 80,

            k = c.pixelLeft + 160,

            d, h;

          do {

            h = (d = oZ.getArZ(l, k, g)).length;

            while (h--) {

              d[h].getExplosion()

            }

          } while (g++ < e);

          c.Die(1);

          EditEle(f.childNodes[1], {

            src: c.PicArr[3] + Math.random()

          }, {

            width: "213px",

            height: "196px",

            left: "-50px",

            top: "-37px"

          });

          oSym.addTask(120, ClearChild, [f])

        }

      }, [a.id])

    }

  }),

  oJalapeno = InheritO(oCherryBomb, {

    EName: "oJalapeno",

    CName: "Hot Chili",

    width: 68,

    height: 89,

    SunNum: 125,

    beAttackedPointR: 48,

    PicArr: ["images/Card/Plants/Jalapeno.png", "images/Plants/Jalapeno/0.gif", "images/Plants/Jalapeno/Jalapeno.gif", "images/Plants/Jalapeno/JalapenoAttack.gif"],

    AudioArr: ["jalapeno"],

    Tooltip: "Destroy the entire row of enemies",

    Produce: 'Fiery hot peppers can destroy an entire line of enemies. <p>Damage: <font color="#FF0000">Extremely high</font><br>Range: <font color="#FF0000">Zombies in the entire line</font><br>Usage:< font color="#FF0000">Use alone, effective immediately</font></p> "Quack, quack, quack, quack!!!" said the hot pepper. He </font><br>won't explode now, it's not time yet, but it's coming soon, oh~, it's coming soon, it's coming soon. He knows, he feels, he has been waiting for this moment all his life! ',

    PrivateBirth: function(a) {

      oSym.addTask(40, function(j) {

        var h = $P[j];

        if (h) {

          PlayAudio("jalapeno");

          var b = $(j),

            f = h.R,

            c = oZ.getArZ(100, oS.W, f),

            e = c.length,

            g = oGd.$Ice[f],

            d = oGd.$Crater;

          while (e--) {

            c[e].getExplosion()

          }

          h.Die(1);

          EditEle(b.childNodes[1], {

            src: "images/Plants/Jalapeno/JalapenoAttack.gif"

          }, {

            width: "755px",

            height: "131px",

            left: 120 - h.pixelLeft + "px",

            top: "-42px"

          });

          oSym.addTask(135, ClearChild, [b]);

          ClearChild($("dIceCar" + f));

          if (g) {

            for (e = g[1]; e < 11; e++) {

              delete d[f + "_" + e]

            }

          }

        }

      }, [a.id])

    }

  }),

  oSpikeweed = InheritO(CPlants, {

    EName: "oSpikeweed",

    CName: "Earth Thorn",

    width: 85,

    height: 35,

    beAttackedPointL: 10,

    beAttackedPointR: 75,

    SunNum: 100,

    Stature: -1,

    canEat: 0,

    PicArr: ["images/Card/Plants/Spikeweed.png", "images/Plants/Spikeweed/0.gif", "images/Plants/Spikeweed/Spikeweed.gif"],

    Attack: 20,

    Supply: {},

    Tooltip: "Punctured tires can also damage zombies walking on them",

    Produce: 'Ground spikes can puncture tires and cause damage to zombies that step on them</font><br><p>Damage: <font color="#FF0000">Normal</font><br>Range : <font color="#FF0000">All zombies that step on him</font><br>Features: <font color="#FF0000">will not be eaten by zombies</font></p> Ground thorns Obsessed with hockey, he bought season tickets to the box. He always pays attention to the players he likes, and he always cleans up the ice hockey rink after games. But there's just one problem: He's afraid of the puck. ',

    CanGrow: function(c, b, e) {

      var a = b + "_" + e,

        d = oS.ArP;

      return d ? e > 0 && e < d.ArC[1] && oGd.$LF[b] == 1 && !(c[1] || c[0]) : !(e < 1 || e > 9 || oGd.$LF[b] - 1 || c[1] || c[0] || oGd.$Crater[a] || oGd.$Tombstones[a])

    },

    getHurt: function(d, b, a) {

      var c = this;

      switch (b) {

        case 2:

          d.flatTire();

          c.Die();

          break;

        case 1:

          d.getHit2(d, 20, 0);

          c.Die();

          break;

        default:

          (c.HP -= a) < 1 && c.Die()

      }

    },

    NormalAttack: function(b, a) {

      var c = $Z[b];

      c.getHit2(c, this.Attack, 0)

    },

    GetDY: function(b, c, a) {

      return -2

    },

    getTriggerRange: function(a, b, c) {

      return [

        [this.pixelLeft - 80, this.pixelRight + 80, 0]

      ]

    },

    TriggerCheck: function(i, h) {

      var c = i.id,

        g = this.ArZ,

        a, b, e, f;

      i.PZ && !g[c] && (a = i.AttackedLX, b = i.AttackedRX, e = this.AttackedLX, f = this.AttackedRX, a <= f && a >= e || b <= f && b >= e || a <= e && b >= f) && this.AttackCheck2(i) && (g[c] = 1, this.NormalAttack(c), oSym.addTask(100, function(d, j) {

        var k = $P[d];

        k && delete k.ArZ[j]

      }, [this.id, c]))

    },

    AttackCheck2: function(a) {

      return a.Altitude == 1 && a.beAttacked

    }

  }),

  oSpikerock = InheritO(oSpikeweed, {

    EName: "oSpikerock",

    CName: "Earth Thorn King",

    width: 84,

    height: 43,

    beAttackedPointL: 10,

    beAttackedPointR: 74,

    SunNum: 125,

    PicArr: ["images/Card/Plants/Spikerock.png", "images/Plants/Spikerock/0.gif", "images/Plants/Spikerock/Spikerock.gif", "images/Plants/Spikerock/2.gif", "images/Plants/Spikerock/3.gif"],

    Attack: 40,

    Tooltip: "Can puncture multiple tires and damage zombies passing by them",

    Produce: 'The Ground Thorn King can puncture multiple tires and cause damage to zombies</font><br>that step on him. <p><font color="#FF0000">Can be planted on thorns</font></p>The thorn king has just returned from a trip to Europe. He had a great time and met a lot of interesting people. These really expanded his horizons - he never knew that they had built such a large museum with so many paintings. This was so surprising to him. ',

    CanGrow: function(c, b, e) {

      var a = b + "_" + e,

        d = oS.ArP;

      return d ? e > 0 && e < d.ArC[1] && oGd.$LF[b] == 1 && !(c[1] || c[0]) : !(e < 1 || e > 9 || oGd.$LF[b] - 1 || c[1] || c[0] || oGd.$Crater[a] || oGd.$Tombstones[a])

    },

    GetDY: function(b, c, a) {

      return 0

    },

    getHurt: function(f, c, b) {

      var e = this,

        d, a = $(e.id).childNodes[1];

      switch (c) {

        case 2:

          f.flatTire();

          break;

        case 1:

          f.getHit2(f, 40, 0)

      }

      switch (true) {

        case (d = e.HP -= b) < 1:

          e.Die();

          break;

        case d < 101:

          a.src = "images/Plants/Spikerock/3.gif";

          break;

        case d < 201:

          a.src = "images/Plants/Spikerock/2.gif"

      }

    }

  }),

  oGarlic = InheritO(CPlants, {

    EName: "oGarlic",

    CName: "Garlic",

    width: 60,

    height: 59,

    beAttackedPointR: 40,

    SunNum: 50,

    HP: 400,

    PicArr: ["images/Card/Plants/Garlic.png", "images/Plants/Garlic/0.gif", "images/Plants/Garlic/Garlic.gif", "images/Plants/Garlic/Garlic_body2.gif", "images/Plants/Garlic/Garlic_body3.gif"],

    Tooltip: "Drive zombies into other rampages",

    Produce: 'Garlic can make zombies change their path. <p>Scope: <font color="#FF0000">Close contact</font><br>Features: <font color="#FF0000">Change the zombie's forward route</font></p>Route steering , this is not only a specialty of garlic, but also his passion. He received his PhD in steering</font><br>at the University of Brussels. He can talk about route vectors and counterattack arrays all day long. He would even push things at home onto the street</font><br>. I don't know why, but his wife can still tolerate this. ',

    CanGrow: function(c, b, f) {

      var a = b + "_" + f,

        d = c[1],

        e = oS.ArP;

      return e ? oGd.$LF[b] == 1 ? f > 0 && f < e.ArC[1] && !(oGd.$Crater[a] || oGd.$Tombstones[a] || d) : c[0] && !d : d && d.EName == "oGarlic" ? 1 : oGd.$LF[b] == 1 ? !(f < 1 || f > 9 || oGd.$Crater[a] || oGd.$Tombstones[a] || d) : c[0] && !d

    },

    InitTrigger: function() {},

    HurtStatus: 0,

    getHurt: function(e, b, a) {

      var c = this,

        d = $(c.id).childNodes[1];

      !(b % 3) ? (c.HP -= 20) < 1 ? c.Die() : (e.ChangeR({

        R: c.R

      }), c.HP < 134 ? c.HurtStatus < 2 && (c.HurtStatus = 2, d.src = "images/Plants/Garlic/Garlic_body3.gif") : c.HP < 267 && c.HurtStatus < 1 && (c.HurtStatus = 1, d.src = "images/Plants/Garlic/Garlic_body2.gif")): c.Die(1)

    }

  }),

  oSquash = InheritO(CPlants, {

    EName: "oSquash",

    CName: "Wogua",

    width: 100,

    height: 226,

    beAttackedPointR: 67,

    SunNum: 50,

    PicArr: ["images/Card/Plants/Squash.png", "images/Plants/Squash/0.gif", "images/Plants/Squash/Squash.gif", "images/Plants/Squash/SquashAttack.gif", "images/Plants/Squash/SquashL.png", "images/Plants/Squash/SquashR.png"],

    AudioArr: ["squash_hmm", "gargantuar_thump"],

    Tooltip: "Squash approaching zombies",

    Produce: 'The crocodile will squash the first zombie that approaches it. <p>Damage: <font color="#FF0000">Extremely high</font><br>Range: <font color="#FF0000">Short, covering all zombies it presses. </font><br>Usage: <font color="#FF0000">Used alone</font></p> "I'm ready!" Wogua yelled, "Go ahead!! Count me in" font><br>One copy! No one is better than me! I am the one you want! Come on!</font><br>What are you waiting for? This is what you want!"',

    GetDY: function(b, c, a) {

      return a[0] ? -21 : -10

    },

    getHurt: function(d, b, a) {

      var c = this;

      b != 3 ? c.NormalAttack(c, d.id, d.ZX + d.Speed * 4 * (!d.WalkDirection ? -1 : 1) - 50) : (c.HP -= a) < 1 && c.Die()

    },

    getTriggerRange: function(a, b, c) {

      return [

        [b - 50, c + 80, 0]

      ]

    },

    TriggerCheck: function(h, g, e) {

      var c = h.ZX,

        b = this.id,

        a = $(b).childNodes[1],

        f = h.isAttacking;

      h.beAttacked && h.Altitude > -1 && h.Altitude < 2 && (f || !f && c - this.AttackedRX < 71) && (PlayAudio("squash_hmm"), oT.$[this.R].splice(e, 1), a.src = c > this.AttackedRX ? "images/Plants/Squash/SquashR.png" : "images/Plants/Squash/SquashL.png", oSym.addTask(100, function(d, j, i) {

        var k = $P[d];

        k && k.NormalAttack(k, h.id, i)

      }, [b, h.id, h.ZX + h.Speed * 4 * (!h.WalkDirection ? -1 : 1) - 50]))

    },

    NormalAttack: function(d, c, b) {

      var a = $(d.id),

        e = $Z[c];

      e && (b = e.ZX + e.Speed * 4 * (!e.WalkDirection ? -1 : 1) - 50);

      a.childNodes[1].src = "images/Plants/Squash/SquashAttack.gif" + $Random + Math.random();

      SetStyle(a, {

        left: b + "px"

      });

      d.Die(1);

      oSym.addTask(45, function(f, l, j) {

        PlayAudio("gargantuar_thump");

        var g = oZ.getArZ(l, l + 100, j),

          h = g.length,

          k;

        while (h--) {

          (k = g[h]).Altitude > -1 && k.PZ && k.Altitude < 3 && k.getThump()

        }

        oSym.addTask(185, ClearChild, [f])

      }, [a, b, d.R])

    }

  }),

  oChomper = InheritO(CPlants, {

    EName: "oChomper",

    CName: "Big Mouth Flower",

    width: 130,

    height: 114,

    beAttackedPointR: 70,

    SunNum: 150,

    AudioArr: ["bigchomp"],

    PicArr: ["images/Card/Plants/Chomper.png", "images/Plants/Chomper/0.gif", "images/Plants/Chomper/Chomper.gif", "images/Plants/Chomper/ChomperAttack.gif", "images/Plants/Chomper/ChomperDigest.gif"],

    Tooltip: "Can swallow a zombie in one breath, but is very fragile in the chewing state",

    Produce: 'Big-mouthed flowers can swallow a whole zombie in one bite, but they are very fragile when digesting zombies. <p>Damage: <font color="#FF0000">Huge</font><br>Range: <font color="#FF0000">Very Close</font><br>Features: <font color="# FF0000">It takes a long time to digest</font></p>Big Mouth Flower could almost go to "Little Shop of Horrors" to perform its stunts</font><br>but his agent squeezed him Too much money, so </font><br>he didn't make it. Despite this, Dazuihua had no complaints and just </font><br>said that this was just part of the deal. ',

    GetDX: function() {

      return -40

    },

    getShadow: function(a) {

      return "top:" + (a.height - 22) + "px"

    },

    getTriggerRange: function(a, b, c) {

      return [

        [this.pixelLeft, c + 80, 0]

      ]

    },

    TriggerCheck: function(a) {

      this.AttackCheck2(a) && (this.canTrigger = 0, this.NormalAttack(this.id, a.id))

    },

    AttackCheck2: function(a) {

      return a.Altitude == 1 && a.beAttacked

    },

    NormalAttack: function(a, b) {

      $(a).childNodes[1].src = "images/Plants/Chomper/ChomperAttack.gif" + $Random + Math.random();

      oSym.addTask(70, function(c, d) {

        PlayAudio("bigchomp");

        $ P [ c ] && oSym . addTask ( 18 , function ( e , f ) {

          var g = $P[e],

            h;

          g && ((h = $Z[f]) && h.beAttacked && h.PZ ? $(e).childNodes[1].src = h.getRaven(e) ? (oSym.addTask(4200, function(i) {

            var j = $P[i];

            j && (j.canTrigger = 1, $(i).childNodes[1].src = "images/Plants/Chomper/Chomper.gif")

          }, [e]), "images/Plants/Chomper/ChomperDigest.gif") : (g.canTrigger = 1, "images/Plants/Chomper/Chomper.gif") : oSym.addTask(18, function(i) {

            var j = $P[i];

            j && (j.canTrigger = 1, $(i).childNodes[1].src = "images/Plants/Chomper/Chomper.gif")

          }, [e]))

        }, [c, d])

      }, [a, b])

    }

  }),

  oBigChomper = InheritO(oChomper, {

    EName: "oBigChomper",

    CName: "Super Big Mouth Flower",

    coolTime: 15,

    PicArr: ["images/Card/Plants/BigChomper.png", "images/Plants/BigChomper/0.gif", "images/Plants/BigChomper/Chomper.gif", "images/Plants/BigChomper/ChomperAttack.gif", "images/Plants/BigChomper/ChomperDigest.gif"],

    Tooltip: "The super big-mouthed flower can swallow a zombie in one breath, and its chewing speed is 50% of the ordinary big-mouthed flower",

    Produce: 'The super big-mouthed flower can swallow a zombie in one breath, and its chewing speed is 50% of that of ordinary big-mouthed flowers. <p>Damage: <font color="#FF0000">Huge</font><br>Range: <font color="#FF0000">Very Close</font><br>Features: <font color="# FF0000">Short chewing time</font></p>Super Big Mouth Flower was once a regular guest on the TV show "Super Big Eater"</font><br>but he was later kicked out of the program group for reasons Yes </font><br>its existence directly affects the audience's food intake and program ratings </font><br>rates. He had no choice but to engage in the act of eating zombies in order to make a living. ',

    NormalAttack: function(a, b) {

      $(a).childNodes[1].src = "images/Plants/BigChomper/ChomperAttack.gif" + $Random + Math.random();

      oSym.addTask(70, function(c, d) {

        PlayAudio("bigchomp");

        $ P [ c ] && oSym . addTask ( 9 , function ( e , f ) {

          var g = $P[e],

            h;

          g && ((h = $Z[f]) && h.beAttacked && h.PZ ? $(e).childNodes[1].src = h.getRaven(e) ? (oSym.addTask(2100, function(i) {

            var j = $P[i];

            j && (j.canTrigger = 1, $(i).childNodes[1].src = "images/Plants/BigChomper/Chomper.gif")

          }, [e]), "images/Plants/BigChomper/ChomperDigest.gif") : (g.canTrigger = 1, "images/Plants/BigChomper/Chomper.gif") : oSym.addTask(9, function(i) {

            var j = $P[i];

            j && (j.canTrigger = 1, $(i).childNodes[1].src = "images/Plants/BigChomper/Chomper.gif")

          }, [e]))

        }, [c, d])

      }, [a, b])

    }

  }),

  oFumeShroom = InheritO(CPlants, {

    EName: "oFumeShroom",

    CName: "Big Spraying Mushroom",

    width: 100,

    height: 88,

    beAttackedPointR: 80,

    SunNum: 75,

    BookHandBack: 2.5,

    SleepGif: 3,

    night: true,

    PicArr: ["images/Card/Plants/FumeShroom.png", "images/Plants/FumeShroom/0.gif", "images/Plants/FumeShroom/FumeShroom.gif", "images/Plants/FumeShroom/FumeShroomSleep.gif", "images/Plants/FumeShroom/FumeShroomAttack.gif", "images/Plants/FumeShroom/FumeShroomBullet.gif"],

    AudioArr: ["fume"],

    Tooltip: "Squirt gas and liquid that can pass through the door panel",

    Produce: 'The odor emitted by the Big Squirting Mushroom can penetrate a wire mesh door. <p>Damage: <font color="#FF0000">Normal, can penetrate barbed wire doors</font><br>Range: <font color="#FF0000">All zombies in the stench<br>Sleeping during the day </font></p> "My old dead-end job was producing yeast spores for a bakery," said Big Penguin. "Then the little squirrel, God </font><br>bless it, told me about this opportunity to slay zombies. Now </font><br>I really feel like a completely different person."',

    GetDY: function(b, c, a) {

      return a[0] ? -18 : -10

    },

    GetDX: function() {

      return -45

    },

    BirthStyle: function(c, d, b, a) {

      oS.DKind && (c.canTrigger = 0, c.Sleep = 1, b.childNodes[1].src = c.PicArr[c.SleepGif]);

      EditEle(b, {

        id: d

      }, a, EDPZ)

    },

    PrivateBirth: function(b) {

      var a = b.id;

      NewEle(a + "_Bullet", "div", "position:absolute;visibility:hidden;width:343px;height:62px;left:" + b.AttackedRX + "px;top:" + (b.pixelTop + 5) + "px;background:url(images/Plants/FumeShroom/FumeShroomBullet.gif);z-index:" + (b.zIndex + 1), 0, EDPZ)

    },

    PrivateDie: function(a) {

      ClearChild($(a.id + "_Bullet"))

    },

    getTriggerRange: function(a, b, c) {

      return [

        [b, Math.min(c + 330, oS.W), 0]

      ]

    },

    NormalAttack: function() {

      PlayAudio("fume");

      var f = this,

        d = oZ.getArZ(f.AttackedLX, Math.min(f.AttackedRX + 330, oS.W), f.R),

        e = d.length,

        g, c = f.id,

        b = $(c),

        a = c + "_Bullet";

      while (e--) {

        (g = d[e]).Altitude < 2 && g.getHit1(g, 20)

      }

      b.childNodes[1].src = "images/Plants/FumeShroom/FumeShroomAttack.gif";

      SetVisible($(a));

      ImgSpriter(a, c, [

        ["0 0", 9, 1],

        ["0 -62px", 9, 2],

        ["0 -124px", 9, 3],

        ["0 -186px", 9, 4],

        ["0 -248px", 9, 5],

        ["0 -310px", 9, 6],

        ["0 -372px", 9, 7],

        ["0 -434px", 9, -1]

      ], 0, function(i, j) {

        var h = $(j);

        $P[j] && (h.childNodes[1].src = "images/Plants/FumeShroom/FumeShroom.gif", SetHidden($(i)))

      })

    }

  }),

  oIceFumeShroom = InheritO(oFumeShroom, {

    EName: "oIceFumeShroom",

    CName: "Ice Spraying Mushroom",

    PicArr: ["images/Card/Plants/FumeShroom.png", "images/Plants/FumeShroom/0.gif", "images/Plants/FumeShroom/FumeShroom.gif", "images/Plants/FumeShroom/FumeShroomSleep.gif", "images/Plants/FumeShroom/FumeShroomAttack.gif", "images/Plants/FumeShroom/FumeShroomBullet.gif"],

    Tooltip: "Squirt gas and liquid that can pass through the door panel",

    Produce: 'The odor emitted by the Big Squirting Mushroom can penetrate a wire mesh door. <p>Damage: <font color="#FF0000">Normal, can penetrate barbed wire doors</font><br>Range: <font color="#FF0000">All zombies in the stench<br>Sleeping during the day </font></p> "My old dead-end job was producing yeast spores for a bakery," said Big Penguin. "Then the little squirrel, God </font><br>bless it, told me about this opportunity to slay zombies. Now </font><br>I really feel like a completely different person."',

    NormalAttack: function() {

      PlayAudio("fume");

      var f = this,

        d = oZ.getArZ(f.AttackedLX, Math.min(f.AttackedRX + 330, oS.W), f.R),

        e = d.length,

        g, c = f.id,

        b = $(c),

        a = c + "_Bullet";

      while (e--) {

        (g = d[e]).Altitude < 2 && g.getSnowPea(g, 20)

      }

      b.childNodes[1].src = "images/Plants/FumeShroom/FumeShroomAttack.gif";

      SetVisible($(a));

      ImgSpriter(a, c, [

        ["0 0", 9, 1],

        ["0 -62px", 9, 2],

        ["0 -124px", 9, 3],

        ["0 -186px", 9, 4],

        ["0 -248px", 9, 5],

        ["0 -310px", 9, 6],

        ["0 -372px", 9, 7],

        ["0 -434px", 9, -1]

      ], 0, function(i, j) {

        var h = $(j);

        $P[j] && (h.childNodes[1].src = "images/Plants/FumeShroom/FumeShroom.gif", SetHidden($(i)))

      })

    }

  }),

  oCoffeeBean = InheritO(CPlants, {

    EName: "oCoffeeBean",

    CName: "coffee beans",

    width: 39,

    height: 97,

    beAttackedPointL: 10,

    beAttackedPointR: 29,

    SunNum: 75,

    PKind: 3,

    canEat: 0,

    PicArr: ["images/Card/Plants/CoffeeBean.png", "images/Plants/CoffeeBean/0.gif", "images/Plants/CoffeeBean/CoffeeBean.gif", "images/Plants/CoffeeBean/CoffeeBeanEat.gif" + $Random],

    AudioArr: ["coffee", "wakeup"],

    Tooltip: "Coffee beans can wake up sleeping mushrooms.",

    Produce: 'Coffee beans can wake up sleeping mushrooms. <p>Usage: <font color="#FF0000">Use alone, effective immediately</font><br>Features: <font color="#FF0000">Can be planted on other plants to wake up mushrooms </font></p>Coffee Bean: "Hey, guys! Hey, what's going on? Who is it? </font><br>Hey! Did you see that thing? What is it? Wow! It's a lion</font><br> font><br>!" Well, Coffee Bean is sure, this can make yourself very excited</font><br>. ',

    InitTrigger: function() {},

    GetDBottom: function() {

      return 49

    },

    GetDY: function() {

      return -30

    },

    CanGrow: function(a, b) {

      return (b = a[1]) && b.Sleep && !a[3]

    },

    BirthStyle: function(c, d, b, a) {

      b.childNodes[1].src = this.PicArr[3] + Math.random();

      EditEle(b, {

        id: d

      }, a, EDPZ)

    },

    PrivateBirth: function(a) {

      SetHidden($(a.id).firstChild);

      PlayAudio("coffee");

      oSym.addTask(240, function(c) {

        PlayAudio("wakeup");

        var d = oGd.$[c],

          b;

        d && (b = d.WakeUP, !b ? ($(d.id).childNodes[1].src = d.PicArr[d.NormalGif], d.canTrigger = 1, d.Sleep = 0) : b(d));

        a.Die()

      }, [a.R + "_" + a.C + "_1"])

    }

  }),

  oGloomShroom = InheritO(oFumeShroom, {

    EName: "oGloomShroom",

    CName: "Melancholy Mushroom",

    width: 112,

    height: 81,

    beAttackedPointR: 92,

    SunNum: 150,

    PicArr: ["images/Card/Plants/GloomShroom.png", "images/Plants/GloomShroom/0.gif", "images/Plants/GloomShroom/GloomShroom.gif", "images/Plants/GloomShroom/GloomShroomSleep.gif", "images/Plants/GloomShroom/GloomShroomAttack.gif", "images/Plants/GloomShroom/GloomShroomBullet.gif"],

    AudioArr: ["kernelpult", "kernelpult2"],

    Tooltip: "Release a large number of spores around itself<br>",

    Produce: 'Release a large number of spores around itself<p><font color="#FF0000">Can be planted on the Big Spray Mushroom</font></p> "I like to spray a lot of smoke." The Melancholic Mushroom said, "I< /font><br>I know many people don’t like this. They say it’s rude and the smog stinks. I just want to say, do you want to do it yourself?</font>< br>My head was eaten by zombies?"',

    CanGrow: function(c, b, f) {

      var a = b + "_" + f,

        d = c[1],

        e = oS.ArP;

      return e ? oGd.$LF[b] == 1 ? f > 0 && f < e.ArC[1] && !(oGd.$Crater[a] || oGd.$Tombstones[a] || d) : c[0] && !d : d && d.EName == "oFumeShroom" ? 1 : oGd.$LF[b] == 1 ? !(f < 1 || f > 9 || oGd.$Crater[a] || oGd.$Tombstones[a] || d) : c[0] && !d

    },

    BirthStyle: function(c, d, b, a) {

      oS.DKind && (c.canTrigger = 0, c.Sleep = 1, b.childNodes[1].src = c.PicArr[c.SleepGif]);

      EditEle(b, {

        id: d

      }, a, EDPZ)

    },

    GetDX: function() {

      return -58

    },

    PrivateBirth: function(b) {

      var a = b.id;

      NewEle(a + "_Bullet", "div", "position:absolute;visibility:hidden;width:210px;height:200px;left:" + (b.pixelLeft - 60) + "px;top:" + (b.pixelTop - 65) + "px;background:url(images/Plants/GloomShroom/GloomShroomBullet.gif);z-index:" + (b.zIndex + 1), 0, EDPZ)

    },

    PrivateDie: function(a) {

      ClearChild($(a.id + "_Bullet"))

    },

    getTriggerRange: function(c, d, e) {

      var f = GetX(this.C),

        b = this.MinX = f - 120,

        a = this.MaxX = f + 120;

      return [

        [b, a, 0]

      ]

    },

    getTriggerR: function(c) {

      var b = this.MinR = c > 2 ? c - 1 : 1,

        a = this.MaxR = c < oS.R ? Number(c) + 1 : c;

      return [b, a]

    },

    NormalAttack: function() {

      var k = this,

        g, f = k.MaxR,

        c = k.MinX,

        b = k.MaxX,

        e, h, a, j = k.id,

        d = $(j),

        l = j + "_Bullet";

      for (g = k.MinR; g <= f; g++) {

        e = oZ.getArZ(c, b, g);

        for (h = e.length; h--;

          (a = e[h]).Altitude < 2 && a.getHit1(a, 80)) {}

      }

      oSym.addTask(100, function(i) {

        PlayAudio(["kernelpult", "kernelpult2"][Math.floor(Math.random() * 2)]);

        --i && oSym.addTask(100, arguments.call,[i]);

      }, [4]);

      d.childNodes[1].src = "images/Plants/GloomShroom/GloomShroomAttack.gif";

      SetVisible($(l));

      ImgSpriter(l, j, [

        ["0 0", 9, 1],

        ["0 -200px", 9, 2],

        ["0 -400px", 9, 3],

        ["0 -600px", 9, 4],

        ["0 -800px", 9, 5],

        ["0 -1000px", 9, 6],

        ["0 -1200px", 9, 7],

        ["0 -1400px", 9, 8],

        ["0 -1600px", 9, 9],

        ["0 -1800px", 9, 10],

        ["0 -2000px", 9, 11],

        ["0 -2200px", 9, -1]

      ], 0, function(m, n) {

        var i = $(n);

        $P[n] && (i.childNodes[1].src = "images/Plants/GloomShroom/GloomShroom.gif");

        SetHidden($(m))

      })

    }

  }),

  oPuffShroom = InheritO(oFumeShroom, {

    EName: "oPuffShroom",

    CName: "Little Spray Mushroom",

    width: 40,

    height: 66,

    beAttackedPointL: 15,

    beAttackedPointR: 25,

    SunNum: 0,

    Stature: -1,

    PicArr: ["images/Card/Plants/PuffShroom.png", "images/Plants/PuffShroom/0.gif", "images/Plants/PuffShroom/PuffShroom.gif", "images/Plants/PuffShroom/PuffShroomSleep.gif", "images/Plants/ShroomBullet.gif", "images/Plants/ShroomBulletHit.gif"],

    AudioArr: ["puff"],

    Tooltip: "Launch short-range spores at enemies",

    Produce: 'Squirt mushrooms are free, but have a very short range. <p>Damage: <font color="#FF0000">Medium</font><br>Range: <font color="#FF0000">Near<br>Go to bed during the day</font></p> Small spray Mushroom: "I only recently learned about the existence of zombies. Like many mushrooms, I just imagined them as monsters in fairy tales and movies. But this experience It's already opened my eyes</font><br>.',

    GetDX: CPlants.prototype.GetDX,

    getTriggerRange: function(a, b, c) {

      return [

        [b, Math.min(c + 250, oS.W), 0]

      ]

    },

    PrivateBirth: function(a) {

      a.BulletEle = NewImg(0, "images/Plants/ShroomBullet.gif", "left:" + (a.AttackedLX - 46) + "px;top:" + (a.pixelTop + 40) + "px;visibility:hidden;z-index:" + (a.zIndex + 2))

    },

    PrivateDie: function(a) {

      a.BulletEle = null

    },

    NormalAttack: function() {

      PlayAudio("puff");

      var b = this,

        c = "PSB" + Math.random(),

        a = b.AttackedLX;

      EditEle(b.BulletEle.cloneNode(false), {

        id: c

      }, 0, EDPZ);

      oSym.addTask(15, function(e) {

        var d = $(e);

        d && SetVisible(d)

      }, [c]);

      oSym.addTask(1, function(j, d, e, f, g) {

        var i = GetC(e),

          h = oZ.getZ0(e, f);

        h && h.Altitude == 1 ? (h.getPea(h, 20, 0), SetStyle(d, {

          left: g + 38 + "px"

        }).src = "images/Plants/ShroomBulletHit.gif", oSym.addTask(10, ClearChild, [d])) : (e += 5) < oS.W ? (d.style.left = (g += 5) + "px", oSym.addTask(1, arguments.callee, [j, d, e, f, g])) : ClearChild(d)

      }, [c, $(c), a, b.R, a - 46])

    }

  }),

  oScaredyShroom = InheritO(oFumeShroom, {

    EName: "oScaredyShroom",

    CName: "Timid Mushroom",

    width: 57,

    height: 81,

    beAttackedPointR: 37,

    SunNum: 25,

    Cry: 0,

    Supply: [],

    Attacking: 0,

    PicArr: ["images/Card/Plants/ScaredyShroom.png", "images/Plants/ScaredyShroom/0.gif", "images/Plants/ScaredyShroom/ScaredyShroom.gif", "images/Plants/ScaredyShroom/ScaredyShroomSleep.gif", "images/Plants/ScaredyShroom/ScaredyShroomCry.gif", "images/Plants/ShroomBullet.gif", "images/Plants/ShroomBulletHit.gif"],

    Tooltip: "Long-range shooter, but will cower when enemies are close",

    Produce: 'The Shroom is a long-range shooter that hides when enemies approach. <p>Damage: <font color="#FF0000">Normal</font><br>Features: <font color="#FF0000">Stop attacking when the enemy approaches<br>Sleeping during the day</font></ p> "Who's there?" Timid Mushroom whispered, his voice so subtle that it was difficult to distinguish. " </font><br>Go away! I don't want to see anyone. Unless...unless you are from the troupe."',

    GetDX: CPlants.prototype.GetDX,

    getTriggerRange: CPlants.prototype.getTriggerRange,

    getTriggerR: function(c) {

      var b = this.MinR = c > 2 ? c - 1 : 1,

        a = this.MaxR = c < oS.R ? Number(c) + 1 : c;

      return [b, a]

    },

    TriggerCheck: function(e, c) {

      var b = this,

        a = b.id;

      e.PZ && Math.abs(e.ZX - b.MX) < 121 && e.beAttacked ? (b.ArZ.push(e.id), !b.Cry && (b.Cry = 1, $(a).childNodes[1].src = "images/Plants/ScaredyShroom/ScaredyShroomCry.gif", b.CryCheck(a))) : e.R == b.R && !b.Cry && !b.Attacking && e.Altitude > 0 && e.Altitude < 3 && b.NormalAttack()

    },

    PrivateBirth: function(c) {

      where b = c.AttackedLX,

        a = b - 46;

      c.BulletClass = NewO({

        X: b,

        R: c.R,

        pixelLeft: a,

        F: oGd.MB2

      });

      c.BulletEle = NewImg(0, "images/Plants/ShroomBullet.gif", "left:" + a + "px;top:" + (c.pixelTop + 35) + "px;visibility:hidden;z-index:" + (c.zIndex + 2));

      c.MX = b + 9

    },

    PrivateDie: function(a) {

      a.BulletEle = null

    },

    NormalAttack: function() {

      var c = this,

        a = c.id,

        d = "SSB" + Math.random(),

        b = c.AttackedLX;

      EditEle(c.BulletEle.cloneNode(false), {

        id: d

      }, 0, EDPZ);

      oSym.addTask(1, function(k, e, f, g, h) {

        var j = GetC(f),

          i = oZ.getZ0(f, g);

        i && i.Altitude == 1 ? (i.getPea(i, 20, 0), SetStyle(e, {

          left: h + 38 + "px"

        }).src = "images/Plants/ShroomBulletHit.gif", oSym.addTask(10, ClearChild, [e])) : (f += 5) < oS.W ? (e.style.left = (h += 5) + "px", oSym.addTask(1, arguments.callee, [k, e, f, g, h])) : ClearChild(e)

      }, [d, $(d), b, c.R, b - 46]);

      c.Attacking = 1;

      oSym.addTask(10, function(g, e) {

        var f = $(g);

        f && SetVisible(f);

        oSym.addTask(130, function(h) {

          var i = $P[h];

          i && (i.Attacking = 0)

        }, [e])

      }, [d, a])

    },

    CryCheck: function(a) {

      oSym.addTask(140, function(b) {

        var d = $P[b],

          c, f, e;

        if (d) {

          c = (f = d.ArZ).length;

          while (c--) {

            (!(e = $Z[f[c]]) || !e.PZ || Math.abs(e.ZX - d.MX) > 120) && f.splice(c, 1)

          }

          f.length ? d.CryCheck(b) : (d.Cry = 0, $(b).childNodes[1].src = "images/Plants/ScaredyShroom/ScaredyShroom.gif")

        }

      }, [a])

    }

  }),

  oHypnoShroom = InheritO(oFumeShroom, {

    EName: "oHypnoShroom",

    CName: "Charm Mushroom",

    width: 71,

    height: 78,

    beAttackedPointL: 10,

    beAttackedPointR: 61,

    SunNum: 75,

    coolTime: 30,

    HP: 1,

    PicArr: ["images/Card/Plants/HypnoShroom.png", "images/Plants/HypnoShroom/0.gif", "images/Plants/HypnoShroom/HypnoShroom.gif", "images/Plants/HypnoShroom/HypnoShroomSleep.gif"],

    Tooltip: "Let a zombie fight for you",

    Produce: 'When a zombie eats a charm mushroom, it will turn around and fight for you</font><br>. <p>How to use: <font color="#FF0000">Use alone, effective on contact</font><br>Features: <font color="#FF0000">Let a zombie fight for you<br>Sleep during the day </font></p>Charm Mushroom claimed: "Zombies are our friends. They have been </font><br>seriously misunderstood. Zombies play a </font><br> role in our ecological environment. important role. We can and should work harder to get them to learn to think the way we do."',

    InitTrigger: function() {},

    getHurt: function(d, b, a) {

      var c = this;

      switch (b) {

        case 3:

          (c.HP -= a) < 1 && c.Die();

          break;

        case 0:

          !c.Sleep && d.bedevil(d);

          c.Die();

          break;

        default:

          c.Die(1)

      }

    }

  }),

  oIceShroom = InheritO(oFumeShroom, {

    EName: "oIceShroom",

    CName: "Ice Mushroom",

    width: 83,

    height: 75,

    beAttackedPointR: 63,

    SunNum: 75,

    coolTime: 50,

    PicArr: ["images/Card/Plants/IceShroom.png", "images/Plants/IceShroom/0.gif", "images/Plants/IceShroom/IceShroom.gif", "images/Plants/IceShroom/IceShroomSleep.gif", "images/Plants/IceShroom/Snow.gif", "images/Plants/IceShroom/icetrap.gif"],

    AudioArr: ["frozen", "wakeup"],

    Tooltip: "Temporarily stop all enemies on the screen",

    Produce: 'Ice Mushroom, which can temporarily freeze all zombies on the screen. <p>Damage: <font color="#FF0000">Very low, freezes zombies</font><br>Range: <font color="#FF0000">All zombies on screen</font><br>Usage :<font color="#FF0000">Used alone, effective immediately<br>Sleeping during the day</font></p>The Ice Mushroom frowned, not because it was unhappy or dissatisfied</font><br> It's just because he suffered facial paralysis due to trauma in his childhood. ',

    GetDX: CPlants.prototype.GetDX,

    GetDY: CPlants.prototype.GetDY,

    InitTrigger: function() {},

    PrivateDie: function(a) {},

    PrivateBirth: function(a) {

      !oS.DKind ? (a.NormalAttack(a.id), a.getHurt = function(d, c, b) {}) : a.getHurt = CPlants.prototype.getHurt

    },

    WakeUP: function(a) {

      var b = a.id;

      a.Sleep = 0;

      $(b).childNodes[1].src = "images/Plants/IceShroom/IceShroom.gif";

      a.NormalAttack(b)

    },

    NormalAttack: function(a) {

      oSym.addTask(100, function(c) {

        var f = $P[c];

        if (f) {

          PlayAudio("frozen");

          var e, d, b = "Snow_" + Math.random();

          for (d in $Z) {

            (e = $Z[d]).ZX < 901 && e.getFreeze(e, d)

          }

          oSym.addTask(40, function(g) {

            ClearChild(g)

          }, [NewEle(b, "div", "position:absolute;left:0;top:0;width:900px;height:600px;z-index:10;filter:alpha(opacity=50);opacity:.5;background:#9CF url(images/Plants/IceShroom/Snow.gif) no-repeat scroll " + (f.pixelLeft - 197) + "px " + (f.pixelTop - 80) + "px", 0, EDPZ)]);

          f.Die()

        }

      }, [a])

    }

  }),

  oSunShroom = InheritO(oFumeShroom, {

    EName: "oSunShroom",

    CName: "Sunshine Mushroom",

    width: 59,

    height: 61,

    beAttackedPointL: 15,

    beAttackedPointR: 44,

    SunNum: 25,

    Stature: -1,

    Status: 0,

    PicArr: ["images/Card/Plants/SunShroom.png", "images/Plants/SunShroom/0.gif", "images/Plants/SunShroom/SunShroom2.gif", "images/Plants/SunShroom/SunShroomSleep.gif", "images/Plants/SunShroom/SunShroom.gif"],

    Tooltip: "The Sun Mushroom initially provides a small amount of sunlight, and then provides a normal amount of sunlight.",

    Produce: 'Sunshine Mushrooms provide a small amount of sunlight at first, and then a normal amount of sunlight. <p>Sunlight production: <font color="#FF0000">Start low, then normal<br>Sleep during the day</font></p> Sunshine mushrooms hate sunlight. I hate it so much that when there is some sunlight inside it, I spit it out as quickly as possible. It just can't stand this</font><br>. To it, sunlight is disgusting. ',

    GetDX: CPlants.prototype.GetDX,

    GetDY: CPlants.prototype.GetDY,

    InitTrigger: function() {},

    PrivateDie: function(a) {},

    PrivateBirth: function() {},

    BirthStyle: function(c, d, b, a) {

      oS.DKind ? (c.canTrigger = 0, c.Sleep = 1, b.childNodes[1].src = "images/Plants/SunShroom/SunShroomSleep.gif") : (oSym.addTask(600, function(h, g, f) {

        var e = $P[h];

        e && e.ProduceSun(e, g, f)

      }, [d, GetX(c.C) - 40, GetY(c.R)]), oSym.addTask(12e3, function(f) {

        var e = $P[f];

        e && (e.Sleep = 0, $(f).childNodes[1].src = "images/Plants/SunShroom/SunShroom.gif", e.Status = 1)

      }, [d]));

      EditEle(b, {

        id: d

      }, a, EDPZ)

    },

    ProduceSun: function(a, c, b) {

      AppearSun(Math.floor(c + Math.random() * 41), b, !a.Status ? 15 : 25, 0), oSym.addTask(2400, function(g, f, e) {

        var d = $P[g];

        d && d.ProduceSun(d, f, e)

      }, [a.id, c, b])

    },

    WakeUP: function(a) {

      var b = a.id;

      a.ProduceSun(a, GetX(a.C) - 40, GetY(a.R));

      $(b).childNodes[1].src = "images/Plants/SunShroom/SunShroom2.gif";

      a.Sleep = 0;

      oSym.addTask(12e3, function(d) {

        var c = $P[d];

        c && ($(d).childNodes[1].src = "images/Plants/SunShroom/SunShroom.gif", c.Status = 1)

      }, [b])

    }

  }),

  oDoomShroom = InheritO(oFumeShroom, {

    EName: "oDoomShroom",

    CName: "Destruction Mushroom",

    width: 102,

    height: 91,

    beAttackedPointR: 80,

    coolTime: 50,

    SunNum: 125,

    AudioArr: ["doomshroom"],

    PicArr: ["images/Card/Plants/DoomShroom.png", "images/Plants/DoomShroom/0.gif", "images/Plants/DoomShroom/DoomShroom.gif", "images/Plants/DoomShroom/Sleep.gif", "images/Plants/DoomShroom/BeginBoom.gif", "images/Plants/DoomShroom/crater10.png", "images/Plants/DoomShroom/crater11.png", "images/Plants/DoomShroom/crater20.png", "images/Plants/DoomShroom/crater21.png", "images/Plants/DoomShroom/crater30.png", "images/Plants/DoomShroom/crater31.png", "images/Plants/DoomShroom/Boom.png"],

    Tooltip: "Causes large-scale damage, but will leave a pit in place. Plants cannot be planted in the pit.",

    Produce: 'The Destruction Shroom can destroy zombies in a large area and leave a large crater in which no plants can be grown. <p>Damage: <font color="#FF0000">Extremely high</font><br>Range: <font color="#FF0000">All zombies in a large area</font><br>Usage:< font color="#FF0000">Used alone, effective immediately</font><br>Features: <font color="#FF0000">Leaves a crater<br>Sleeping during the day</font></p> "You Fortunately, I am with you," said the Destruction Mushroom, "</font><br>I can destroy anything you value, it's a piece of cake."',

    InitTrigger: function() {},

    BirthStyle: function(c, d, b, a) {

      oS.DKind ? (c.Sleep = 1, b.childNodes[1].src = c.PicArr[c.SleepGif]) : (c.Sleep = 0, c.getHurt = function() {}, b.childNodes[1].src = "images/Plants/DoomShroom/BeginBoom.gif", c.NormalAttack(d));

      EditEle(b, {

        id: d

      }, a, EDPZ)

    },

    WakeUP: function(a) {

      var b = a.id;

      a.Sleep = 0;

      a.getHurt = function() {};

      $(b).childNodes[1].src = "images/Plants/DoomShroom/BeginBoom.gif";

      a.NormalAttack(b)

    },

    NormalAttack: function(a) {

      oSym.addTask(50, function(c) {

        PlayAudio("doomshroom");

        var d = $P[c],

          q = c + "_Boom";

        if (d) {

          var g = $(c),

            l = d.R,

            h = l > 3 ? l - 2 : 1,

            f = Math.min(oS.R, l + 2),

            n = d.pixelLeft - 240,

            m = d.pixelRight + 240,

            e, k, b = GetC(d.AttackedLX),

            o, r = l + "_" + b,

            j = oGd.$;

          do {

            k = (e = oZ.getArZ(n, m, h)).length;

            while (k--) {

              e[k].getExplosion()

            }

          } while (h++ < f);

          d.Die();

          (o = j[r + "_" + 0]) && o.Die();

          (o = j[r + "_" + 2]) && o.Die();

          oGd.$Crater[r] = 2;

          NewEle(q, "div", "position:absolute;overflow:hidden;z-index:" + (d.zIndex + 2) + ";width:283px;height:324px;left:" + (d.pixelLeft - 80) + "px;top:" + (d.pixelTop - 220) + "px;background:url(images/Plants/DoomShroom/Boom.png) no-repeat", 0, EDPZ);

          oSym.addTask(20, function(i) {

            ClearChild(i)

          }, [NewEle(q, "div", "position:absolute;z-index:20;width:900px;height:600px;left:0;top:0;background:#FFF;*filter:alpha(opacity=50);opacity:.5", 0, EDPZ)]);

          ImgSpriter(q, c, [

            ["0 0", 10, 1],

            ["-283px 0", 10, 2],

            ["-566px 0", 10, 3],

            ["-849px 0", 10, 4],

            ["-1132px 0", 10, 5],

            ["-1415px 0", 10, 6],

            ["-1698px 0", 10, 7],

            ["-1981px 0", 10, 8],

            ["-2264px 0", 10, 9],

            ["-2547px 0", 10, -1]

          ], 0, function(i, p) {

            ClearChild($(i));

            d.setCrater(c + "_crater", l, b, d.pixelLeft + 3, d.pixelTop + 50)

          })

        }

      }, [a])

    },

    setCrater: function(f, b, d, e, c) {

      there is a;

      switch (oGd.$LF[b]) {

        case 1:

          a = NewEle(f, "div", "position:absolute;z-index:" + (3 * b - 1) + ";overflow:hidden;background:url(images/Plants/DoomShroom/crater1" + oS.DKind + ".png) no-repeat;width:90px;height:61px;left:" + (e || GetX(d) - 45) + "px;top:" + (c || GetY(b) - 30) + "px", 0, EDPZ);

          break;

        case 2:

          a = NewEle(f, "div", "position:absolute;z-index:" + (3 * b - 1) + ";overflow:hidden;background:url(images/Plants/DoomShroom/crater2" + oS.DKind + ".png) no-repeat;width:85px;height:53px;left:" + (e || GetX(d) - 42) + "px;top:" + (c || GetY(b) - 26) + "px", 0, EDPZ);

          break;

        case 3:

          a = NewEle(f, "div", "position:absolute;z-index:" + (3 * b - 1) + ";overflow:hidden;background:url(images/Plants/DoomShroom/crater31.png) no-repeat;width:75px;height:77px;left:" + (e || GetX(d) - 37) + "px;top:" + (c || GetY(b) - 19) + "px", 0, EDPZ);

          break;

        default:

      }

      oSym.addTask(9e3, function(g) {

        var h = b + "_" + d;

        g.style.backgroundPosition = "100% 0";

        oGd.$Crater[h] = 1;

        oSym.addTask(9e3, function(i, j) {

          ClearChild(i);

          delete oGd.$Crater[j]

        }, [g, h])

      }, [a])

    }

  }),

  oTangleKlep = InheritO(CPlants, {

    EName: "oTangleKlep",

    CName: "Tangled Waterweed",

    width: 90,

    height: 72,

    beAttackedPointL: 15,

    beAttackedPointR: 80,

    coolTime: 30,

    SunNum: 25,

    BookHandBack: 4.9,

    GetDY: function(b, c, a) {

      return 5

    },

    NormalGif: 1,

    AudioArr: ["TangleKlep"],

    PicArr: ["images/Card/Plants/TangleKlep.png", "images/Plants/TangleKlep/0.gif", "images/Plants/TangleKlep/Float.gif", "images/Plants/TangleKlep/Grab.png", "images/interface/splash.png"],

    Tooltip: "Aquatic plants that can pull zombies underwater",

    Produce: 'Tangleweed is an aquatic plant that can pull zombies that approach it into the water</font><br>. <p>Damage: <font color="#FF0000">Extremely high</font><br>Usage: <font color="#FF0000">Use alone, effective after contact</font><br>Features:< font color="#FF0000">Must be planted in water</font></p> "I am completely invisible," the entangled waterweed thought to himself, "I will </font><br>hide under the water, no one will see me." His friends told him</font><br>that they could see him clearly. However, Tangled Waterweed</font><br>seems not to want to change its opinion. ',

    CanGrow: function(c, b, d) {

      var a = b + "_" + d;

      return !(oGd.$LF[b] != 2 || d < 1 || d > 9 || oGd.$Crater[a] || c[0] || c[1] || oGd.$Tombstones[a])

    },

    getShadow: function(a) {

      return "display:none"

    },

    getTriggerRange: function(a, b, c) {

      return [

        [b, c, 0]

      ]

    },

    BirthStyle: function(c, d, b, a) {

      b.childNodes[1].src = "images/Plants/TangleKlep/Float.gif";

      EditEle(b, {

        id: d

      }, a, EDPZ)

    },

    getHurt: function(d, b, a) {

      var c = this;

      b == 3 ? (c.HP -= a) < 1 && c.Die() : (c.canTrigger = 0, c.NormalAttack(c, d))

    },

    TriggerCheck: function(b, a) {

      b.AttackedLX < GetX(9) && b.beAttacked && (this.canTrigger = 0, this.NormalAttack(this, b))

    },

    NormalAttack: function(a, b) {

      a.getHurt = function() {};

      b.getHurt = function() {};

      b.beAttacked = 0;

      b.isAttacking = 1;

      NewImg(0, "images/Plants/TangleKlep/Grab.png", "left:" + b.beAttackedPointL + "px;top:" + (b.height - 67) + "px", b.Ele);

      oSym.addTask(50, function(g, h) {

        PlayAudio("TangleKlep");

        var e = g.id,

          f = h.id,

          d = e + "_splash",

          c = f + "_splash";

        NewEle(d, "div", "position:absolute;background:url(images/interface/splash.png);left:" + (g.pixelLeft - 4) + "px;top:" + (g.pixelTop - 16) + "px;width:97px;height:88px;over-flow:hidden", 0, EDPZ);

        NewEle(c, "div", "position:absolute;background:url(images/interface/splash.png);left:" + (h.AttackedLX - 10) + "px;top:" + (h.pixelTop + h.height - 88) + "px;width:97px;height:88px;over-flow:hidden", 0, EDPZ);

        ImgSpriter(d, e, [

          ["0 0", 9, 1],

          ["-97px 0", 9, 2],

          ["-194px 0", 9, 3],

          ["-291px 0", 9, 4],

          ["-388px 0", 9, 5],

          ["-485px 0", 9, 6],

          ["-582px 0", 9, 7],

          ["-679px 0", 9, -1]

        ], 0, function(i, j) {

          ClearChild($(i))

        });

        ImgSpriter(c, f, [

          ["0 0", 9, 1],

          ["-97px 0", 9, 2],

          ["-194px 0", 9, 3],

          ["-291px 0", 9, 4],

          ["-388px 0", 9, 5],

          ["-485px 0", 9, 6],

          ["-582px 0", 9, 7],

          ["-679px 0", 9, -1]

        ], 0, function(i, j) {

          ClearChild($(i))

        });

        h.DisappearDie();

        g.Die()

      }, [a, b])

    }

  }),

  oSeaShroom = InheritO(oPuffShroom, {

    EName: "oSeaShroom",

    CName: "Sea Mushroom",

    width: 48,

    height: 99,

    beAttackedPointL: 10,

    beAttackedPointR: 40,

    coolTime: 30,

    BookHandBack: 4.9,

    Sleep: 0,

    getShadow: function(a) {

      return "display:none"

    },

    PicArr: ["images/Card/Plants/SeaShroom.png", "images/Plants/SeaShroom/0.gif", "images/Plants/SeaShroom/SeaShroom.gif", "images/Plants/SeaShroom/SeaShroomSleep.gif", "images/Plants/ShroomBullet.gif", "images/Plants/ShroomBulletHit.gif"],

    CanGrow: function(c, b, d) {

      var a = b + "_" + d;

      return !(d < 1 || d > 9 || oGd.$LF[b] - 2 || c[0] || c[1] || oGd.$Crater[a] || oGd.$Tombstones[a])

    },

    BirthStyle: function(c, d, b, a) {

      EditEle(b, {

        id: d

      }, a, EDPZ)

    },

    Tooltip: "Aquatic plants that emit spores over short distances",

    Produce: 'Sea mushrooms, aquatic plants capable of firing short-range spores. <p>Damage: <font color="#FF0000">Normal</font><br>Range: <font color="#FF0000">Short<br>Must be planted on water</font></p>Sea Mushroom has never seen the sea. The sea is in his name. He has always heard about the sea. He just didn't find the right time. One day... yes, he will see the sea. '

  });

oCactus = InheritO(CPlants, {

  EName: "oCactus",

  CName: "Cactus",

  width: 122,

  height: 157,

  SunNum: 125,

  beAttackedPointL: 10,

  beAttackedPointR: 80,

  AudioArr: ["plantgrow"],

  Status: 0,

  PicArr: function() {

    return ["images/Card/Plants/Cactus.png", "images/Plants/Cactus/0.gif", "images/Plants/Cactus/Cactus.gif", "images/Plants/Cactus/Cactus2.gif", "images/Plants/Cactus/Attack.gif", "images/Plants/Cactus/Attack2.gif", "images/Plants/Cactus/Elongation.gif", "images/Plants/Cactus/Shorten.gif", "images/Plants/Cactus/Projectile32.png"]

  }(),

  Tooltip: "Can fire bullets that pierce balloons",

  Produce: 'The piercing projectile fired by the Cactus can be used to hit ground and air targets </font><br><p> Damage: <font color="#FF0000">Medium</font><br>Range: <font color ="#FF0000">Ground and air</font></p>It is true that cactus is very "thorny", but beneath her thorns, there is a gentle heart, full of love. and kindness. She just wants to hug</font><br>others and be hugged by others. Most people can't do this</font><br>but Cactus doesn't mind. She has been staring at an armored rat for a while, and this time it seems that she can really hug it. ',

  getShadow: function(a) {

    return "left:3px;top:132px"

  },

  PrivateBirth: function(a) {

    a.ES = a.Elongation

  },

  TriggerCheck: function(b, a) {

    this.ES() && (this.canTrigger = 0, this.CheckLoop(b.id, a))

  },

  CheckLoop: function(b, c) {

    var a = this.id;

    this.NormalAttack(b);

    this.ES();

    this.Status == 0 && oSym.addTask(140, function(e, f, h) {

      var g;

      (g = $P[e]) && g.ES() && g.AttackCheck1(f, h)

    }, [a, b, c])

  },

  CheckLoop2: function(b, c) {

    var a = this.id;

    this.NormalAttack(b);

    this.ES();

    this.Status && oSym.addTask(150, function(e, f, h) {

      var g;

      (g = $P[e]) && g.ES() && g.AttackCheck12(f, h)

    }, [a, b, c])

  },

  AttackCheck1: function(g, f) {

    var b = this,

      c = b.oTrigger,

      a = $Z[g],

      h, e, k, j;

    if (a && a.PZ && (h = c[a.R])) {

      k = a.ZX;

      e = h.length;

      while (e--) {

        j = h[e];

        if (j[0] <= k && j[1] >= k && a.Altitude > 0) {

          b.CheckLoop(g, j[2]);

          return

        }

      }

    }

    b.canTrigger = 1

  },

  AttackCheck12: function(a, c) {

    var b = this;

    b.CheckLoop(a, c)

  },

  Elongation: function() {

    var a = this,

      b = a.id;

    if (!oGd.$Balloon[a.R] > 0) {

      return true

    } else {

      PlayAudio("plantgrow");

      a.canTrigger = 0;

      a.Status = 1;

      $(b).childNodes[1].src = "images/Plants/Cactus/Elongation.gif";

      oSym.addTask(1, function(e) {

        var d = $P[e],

          c;

        if (d) {

          d.NormalGif = 3;

          $(e).childNodes[1].src = "images/Plants/Cactus/Cactus2.gif";

          c = d.CheckLoop;

          d.CheckLoop = d.CheckLoop2;

          d.CheckLoop2 = c;

          c = d.NormalAttack;

          d.NormalAttack = d.NormalAttack2;

          d.NormalAttack2 = c;

          d.ES = d.Shorten;

          d.canTrigger = 1

        }

      }, [b]);

      return false

    }

  },

  Shorten: function() {

    var a = this,

      b = a.id;

    if (oGd.$Balloon[a.R] > 0) {

      return true

    } else {

      a.canTrigger = 0;

      a.Status = 0;

      $(b).childNodes[1].src = "images/Plants/Cactus/Shorten.gif";

      oSym.addTask(1, function(e) {

        var d = $P[e],

          c;

        if (d) {

          d.NormalGif = 2;

          $(e).childNodes[1].src = "images/Plants/Cactus/Cactus.gif";

          c = d.CheckLoop;

          d.CheckLoop = d.CheckLoop2;

          d.CheckLoop2 = c;

          c = d.NormalAttack;

          d.NormalAttack = d.NormalAttack2;

          d.NormalAttack2 = c;

          d.ES = d.Elongation;

          d.canTrigger = 1

        }

      }, [b]);

      return false

    }

  },

  NormalAttack: function() {

    var b = this,

      c = "CB" + Math.random(),

      a = b.id;

    $(a).childNodes[1].src = "images/Plants/Cactus/Attack.gif";

    oSym.addTask(40, function(e) {

      var d = $(e);

      d && (d.childNodes[1].src = "images/Plants/Cactus/Cactus.gif")

    }, [a]);

    NewImg(c, b.PicArr[8], "left:" + (b.AttackedRX + 25) + "px;top:" + (b.pixelTop + 103) + "px;visibility:hidden;z-index:" + (b.zIndex + 2), EDPZ);

    oSym.addTask(30, function(e) {

      var d = $(e);

      d && SetVisible(d)

    }, [c]);

    oSym.addTask(1, function(g, i, d, k, h, l) {

      var j, f = GetC(k),

        e = oZ["getZ" + d](k, h);

      e && e.Altitude == 1 ? (e.getPea(e, 30, d), ClearChild(i)) : (k += j = !d ? 5 : -5) < oS.W && k > 100 ? (i.style.left = (l += j) + "px", oSym.addTask(1, arguments.callee, [g, i, d, k, h, l])) : ClearChild(i)

    }, [c, $(c), 0, b.AttackedLX, b.R, b.AttackedLX - 40])

  },

  NormalAttack2: function() {

    var b = this,

      c = "CB" + Math.random(),

      a = b.id;

    $(a).childNodes[1].src = "images/Plants/Cactus/Attack2.gif";

    oSym.addTask(50, function(e) {

      var d = $(e);

      d && (d.childNodes[1].src = "images/Plants/Cactus/Cactus2.gif")

    }, [a]);

    NewImg(c, b.PicArr[8], "left:" + (b.AttackedRX + 125) + "px;top:" + (b.pixelTop + 33) + "px;visibility:hidden;z-index:" + (b.zIndex + 2), EDPZ);

    oSym.addTask(20, function(e) {

      var d = $(e);

      d && SetVisible(d)

    }, [c]);

    oSym.addTask(1, function(g, i, d, k, h, l) {

      var j, f = GetC(k),

        e = oZ["getZ" + d](k, h);

      e && e.Altitude == 3 ? (e.getHit0(e, 20, d), e.Drop(), ClearChild(i)) : (k += j = !d ? 5 : -5) < oS.W && k > 100 ? (i.style.left = (l += j) + "px", oSym.addTask(1, arguments.callee, [g, i, d, k, h, l])) : ClearChild(i)

    }, [c, $(c), 0, b.AttackedLX, b.R, b.AttackedLX - 40])

  }

}), oOxygen = InheritO(CPlants, {

  EName: "oOxygen",

  CName: "Oxygen algae",

  width: 73,

  height: 74,

  beAttackedPointR: 53,

  SunNum: 25,

  HP: 300,

  BookHandBack: 3.5,

  coolTime: 7.5,

  PicArr: ["images/Card/Plants/Oxygen.png", "images/Plants/Oxygen/0.gif", "images/Plants/Oxygen/Oxygen.gif"],

  Tooltip: "Aerobic algae can provide oxygen to plants on the ground",

  Produce: 'Oxygen algae can provide oxygen to plants on the ground<p>Toughness: <font color="FF0000">Medium</font><p><font color="#000000">Range: <font color="# 1F470B">3x3</font></p>Pfft... Oxygen algae spit out bubbles silently, not that he wanted to keep vomiting, but because he drank too much soda yesterday. But there are rumors </font><br>that he does nothing but blow bubbles. ',

  CanGrow: function(e, d, f) {

    var c = d + "_" + f,

      b = oGd.$LF[d],

      a = f < 1 || f > 9;

    return b % 2 ? b < 3 ? !(a || e[1] || e[2] || e[0] || oGd.$Crater[c] || oGd.$Tombstones[c]) : !(a || e[0] || oGd.$Crater[c]) : 0

  },

  NormalAttack: function() {},

  PrivateBirth: function(a) {

    var R = aR,

      C = a.C,

      R1, C1, MaxR = oS.R,

      MaxC = oS.C,

      LF = oGd.$LF,

      LFR, _$ = oGd.$,

      rc;

    for (R1 = R - 1; R1 <= R + 1; R1++) {

      if (R1 > 0 && R1 <= MaxR) {

        LFR = LF[R];

        for (C1 = C - 1; C1 <= C + 1; C1++) {

          if ( C1 > 0 && C1 <= MaxC && ( LFR == 1 || LFR == 3 )) {

            rc = R1 + "_" + C1 + "_";

            !(_$[rc + 0] || _$[rc + 1] || _$[rc + 2]) && CustomSpecial(oOG, R1, C1)

          }

        }

      }

    }

  }

}), oFlamesMushroom = InheritO(CPlants, {

  EName: "oFlamesMushroom",

  CName: "Fire Mushroom",

  width: 102,

  height: 91,

  beAttackedPointR: 80,

  SunNum: 200,

  HP: 4e3,

  BookHandBack: 2.5,

  coolTime: 30,

  PicArr: ["images/Card/Plants/FlamesMushroom.png", "images/Plants/FlamesMushroom/0.gif", "images/Plants/FlamesMushroom/FlamesMushroom.gif", "images/Plants/FlamesMushroom/FlamesMushroom1.gif", "images/Plants/FlamesMushroom/FlamesMushroom2.gif"],

  Tooltip: "The Flame Mushroom can summon multiple Destruction Mushrooms to overwhelm all zombies",

  Produce: 'The Flame Mushroom can summon multiple Destruction Mushrooms, overwhelming all zombies<p>Toughness: <font color="FF0000">High</font><p><font color="#000000">Skills:< font color="#1F470B">Summons 8 Destruction Mushrooms within a 3x3 range of itself</font></p>Fire Mushrooms are always disgusted by their own flames because they</font><br>always hurt own friends. So for the sake of his friends, Lieyan</font><br>gu found his home in the garden. ',

  getHurt: function(e, b, a) {

    var c = this,

      d = $(c.id).childNodes[1];

    !(b % 3) ? (c.HP -= a) < 1 ? c.Die() : c.HP < 2667 ? c.HurtStatus < 2 && (c.HurtStatus = 2, d.src = "images/Plants/FlamesMushroom/FlamesMushroom2.gif") : c.HP < 5333 && c.HurtStatus < 1 && (c.HurtStatus = 1, d.src = "images/Plants/FlamesMushroom/FlamesMushroom1.gif"): c.Die(1)

  },

  NormalAttack: function() {},

  PrivateBirth: function(a) {

    var R = aR,

      C = a.C,

      R1, C1, MaxR = oS.R,

      MaxC = oS.C,

      LF = oGd.$LF,

      LFR, _$ = oGd.$,

      rc;

    for (R1 = R - 1; R1 <= R + 1; R1++) {

      if (R1 > 0 && R1 <= MaxR) {

        LFR = LF[R];

        for (C1 = C - 1; C1 <= C + 1; C1++) {

          if ( C1 > 0 && C1 <= MaxC && ( LFR == 1 || LFR == 3 )) {

            rc = R1 + "_" + C1 + "_";

            !(_$[rc + 0] || _$[rc + 1] || _$[rc + 2]) && CustomSpecial(oDoomShroom, R1, C1)

          }

        }

      }

    }

  }

}), oOG = InheritO(CPlants, {

  EName: "oOG",

  CName: "Oxygen",

  width: 72,

  height: 68,

  beAttackedPointR: 52,

  SunNum: 0,

  canEat: 0,

  BookHandBack: 5,

  PicArr: ["images/Card/Plants/Oxygen.png", "images/Plants/Oxygen/0.gif", "images/Plants/Oxygen/Oxygen1.gif"],

  PKind: 0,

  Stature: -1,

  GetDY: function(b, c, a) {

    return -15

  },

  getShadow: function(a) {

    return "display:none";

    return "left:" + (a.width * .5 - 20) + "px;top:" + (a.height - 22) + "px"

  },

  CanGrow: function(e, d, f) {

    var c = d + "_" + f,

      b = oGd.$LF[d],

      a = f < 1 || f > 9;

    return b % 2 ? b < 3 ? !(a || e[1] || e[2] || e[0] || oGd.$Crater[c] || oGd.$Tombstones[c]) : !(a || e[0] || oGd.$Crater[c]) : 0

  },

  Tooltip: "",

  Produce: "",

  InitTrigger: function() {}

}), oPlantern = InheritO(CPlants, {

  EName: "oPlantern",

  CName: "street lamp flower",

  width: 250,

  height: 242,

  beAttackedPointL: 105,

  beAttackedPointR: 145,

  canEat: 1,

  BookHandBack: 2.5,

  SunNum: 25,

  PicArr: ["images/Card/Plants/Plantern.png", "images/Plants/Plantern/0.gif", "images/Plants/Plantern/Plantern.gif"],

  Tooltip: "Illuminate an area so players can see through the fog of the battlefield",

  Produce: 'Street lanterns can illuminate an area and allow you to see clearly the fog of the battlefield<p>Range: <font color="#FF0000">A circular area</font><br>Features: <font color=" #FF0000">Enables you to see clearly the fog of the battlefield</font></p> Lantern Grass rejects science, he will only immerse himself in hard work. Other plants</font><br>eat light and squeeze out oxygen. The lantern plant eats darkness, but squeezes out light. Lantern</font><br>Nepenthes is cautious about how he can produce light. "I wouldn't say it's 'witchcraft,' and I </font><br>don't use 'dark power,' I just... I think I've said it </font><br>enough. "',

  PrivateBirth: function(c) {

    var a = cR,

      b = c.C;

    NewImg("", "", "filter:alpha(opacity=30);opacity:.3;left:0;top:0;z-index:" + c.zIndex, $(c.id));

    oS.HaveFog && oGd.GatherFog(a, b, 2, 3, 0)

  },

  InitTrigger: function() {},

  PrivateDie: function(c) {

    var a = cR,

      b = c.C;

    delete oGd.$Plantern[a + "_" + b];

    oS.HaveFog && oGd.GatherFog(a, b, 2, 3, 1)

  },

  GetDY: function(b, c, a) {

    return a[0] ? 70 : 74

  },

  getShadow: function(a) {

    return "left:" + (a.width * .5 - 43) + "px;top:" + (a.height - 100) + "px"

  }

}), cheeses = InheritO(CPlants, {

  EName: "ostar",

  CName: "Starfish Fruit",

  width: 71,

  height: 71,

  beAttackedPointL: 10,

  beAttackedPointR: 61,

  SunNum: 75,

  HP: 4e3,

  canEat: 0,

  BookHandBack: 3.5,

  Tooltip: "The tentacles of the starfish fruit can easily overturn zombies and cause chaos",

  Produce: 'The tentacles of the starfish fruit can easily overturn zombies and cause chaos<p>Attack: <font color="#FF0000">Large</font><br>Path: <font color="#FF0000">Random </font></p>The impact line of Starfish always maintains a charming smile. No one knows the secret of his </font><br>love of spinning in circles without getting dizzy. Some people say that it is because of him </font> ><br>Those cross-eyed eyes can only look at a little bit without getting dizzy. ',

  PicArr: ["images/Card/Plants/star.png", "images/Plants/star/0.gif", "images/Plants/star/starRoll.gif"],

  AudioArr: ["bowling", "bowlingimpact", "bowlingimpact2"],

  CanAttack: 1,

  InitTrigger: function() {},

  getHurt: function() {},

  CanGrow: function(e, d, f) {

    var c = d + "_" + f,

      b = oGd.$LF[d],

      a = f < 1 || f > 9;

    return b % 2 ? b < 3 ? !(a || e[1] || e[2] || e[0] || oGd.$Crater[c] || oGd.$Tombstones[c]) : !(a || e[0] || oGd.$Crater[c]) : 0

  },

  NormalAttack: null,

  PrivateBirth: function(c) {

    var d = $(c.id);

    PlayAudio("bowling");

    (function(z, y, q, r, p, x, e, g, b) {

      var a = zR,

        l = z.C,

        A, u, s, v = 0,

        w, i, t = false;

      if (z.CanAttack && (A = oZ.getZ0(r, a)) && A.getCrushed(z)) {

        u = A.id;

        PlayAudio(["bowlingimpact", "bowlingimpact2"][Math.floor(Math.random() * 2)]);

        switch (A.Ornaments) {

          case 0:

            A.NormalDie();

            break;

          case 1:

            A.getHit0(A, Math.min(A.OrnHP, 900), 0);

            break;

          default:

            z.side ? A.Normaldie() : A.CheckOrnHP(A, u, A.OrnHP, 400, A.PicArr, 0, 0, 0)

        }

        z.CanAttack = 0;

        switch (a) {

          case oS.R:

            e = -1;

            break;

          case 1:

            e = 1;

            break;

          default:

            switch (e) {

              case 1:

                e = -1;

                break;

              case -1:

                e = 1;

                break;

              default:

                e = Math.random() > .5 ? 1 : -1

            }

        }

        oSym.addTask(1, arguments.callee, [z, y, z.AttackedLX + 20, z.AttackedRX + 20, z.pixelLeft + 20, x, e, g, b])

      } else {

        switch (e) {

          case 1:

            z.pixelBottom + 2 > b && (e = -1);

            break;

          case -1:

            z.pixelBottom - 2 < g && (e = 1);

            break

        }

        q > y ? z.Die() : (i = GetC(z.pixelRight += 2), z.AttackedLX = q += 2, z.AttackedRX = r += 2, w = GetR(z.pixelBottom += e * 2), SetStyle(x, {

          left: (z.pixelLeft = p += 2) + "px",

          top: (z.pixelTop += e * 2) + "px"

        }), w != a && (z.R = w, t = true, !z.CanAttack && (z.CanAttack = 1)), i != l && (z.C = i, t = true), t && (oGd.del({

          R: a,

          C:l,

          PKind: 1

        }), oGd.add(z, w + "_" + i + "_1")), oSym.addTask(1, arguments.callee, [z, y, z.AttackedLX, z.AttackedRX, z.pixelLeft, x, e, g, b]))

      }

    })(c, oS.W, c.AttackedLX, c.AttackedRX, c.pixelLeft, d, 0, GetY1Y2(1)[0], 600)

  }

}), ostar1 = InheritO(oNutBowling, {

  EName: "ostar1",

  CName: "Starfish Fruit 1",

  width: 71,

  height: 71,

  beAttackedPointL: 10,

  beAttackedPointR: 61,

  SunNum: 75,

  coolTime: 50,

  HP: 0,

  canEat: 0,

  BookHandBack: 3,

  Stature: 1,

  PicArr: ["images/Card/Plants/star.png", "images/Plants/star/0.gif", "images/Plants/star/starRoll.gif"],

  Tooltip: "",

  Produce: "",

  PrivateBirth: function(a) {

    PlayAudio("bowling");

    (function(b, c, n, m, e, g) {

      var d = oZ.getArZ(n, m, e),

        f = d.length,

        k, j, l = b.R,

        h = b.C;

      while (f--) {

        (k = d[f]).getCrushed(b) && k.CrushDie()

      }

      n > c ? b.Die() : (j = GetC(b.pixelRight += 2), b.AttackedLX = n += 2, b.AttackedRX = m += 2, g.style.left = (b.pixelLeft += 2) + "px", j != h && (b.C = j, oGd.del({

        R: l,

        C: h,

        PKind: 1

      }), oGd.add(b, l + "_" + j + "_1")), oSym.addTask(1, arguments.callee, [b, c, n, m, e, g]))

    })(a, oS.W, a.AttackedLX, a.AttackedRX, a.R, $(a.id))

  }

}), oGun = InheritO(oPuffShroom, {

  EName: "oGun",

  CName: "Water Gun Grass",

  Sleep: 0,

  width: 40,

  height: 66,

  beAttackedPointL: 15,

  beAttackedPointR: 25,

  BookHandBack: 3.5,

  SunNum: 0,

  PicArr: ["images/Card/Plants/gun.png", "images/Plants/gun/0.gif", "images/Plants/gun/SeaShroom.gif", "images/Plants/gun/SeaShroomSleep.gif", "images/Plants/gun/ShroomBullet.gif", "images/Plants/gun/ShroomBulletHit.gif"],

  CanGrow: function(e, d, f) {

    var c = d + "_" + f,

      b = oGd.$LF[d],

      a = f < 1 || f > 9;

    return b % 2 ? b < 3 ? !(a || e[1] || e[2] || e[0] || oGd.$Crater[c] || oGd.$Tombstones[c]) : !(a || e[0] || oGd.$Crater[c]) : 0

  },

  Tooltip: "Lightweight Undersea Combat Plant",

  Produce: 'Water Gun Grass can be planted directly on the seabed, but its range is relatively short. <p>Damage: <font color="#FF0000">Small</font><br>Range: <font color="#FF0000">Short</font></p> Ever since the water gun grass got the peerless spit After receiving the secret book, I have been practicing continuously, hoping that I can break through the three-meter range. ',

  PrivateBirth: function(a) {

    a.BulletEle = NewImg(0, "images/Plants/gun/ShroomBullet.gif", "left:" + (a.AttackedLX - 46) + "px;top:" + (a.pixelTop + 40) + "px;visibility:hidden;z-index:" + (a.zIndex + 2))

  },

  BirthStyle: function(c, d, b, a) {

    EditEle(b, {

      id: d

    }, a, EDPZ)

  },

  PrivateDie: function(a) {

    a.BulletEle = null

  },

  NormalAttack: function() {

    PlayAudio("puff");

    var b = this,

      c = "PSB" + Math.random(),

      a = b.AttackedLX;

    EditEle(b.BulletEle.cloneNode(false), {

      id: c

    }, 0, EDPZ);

    oSym.addTask(15, function(e) {

      var d = $(e);

      d && SetVisible(d)

    }, [c]);

    oSym.addTask(1, function(j, d, e, f, g) {

      var i = GetC(e),

        h = oZ.getZ0(e, f);

      h && h.Altitude == 1 ? (h.getPea(h, 20, 0), SetStyle(d, {

        left: g + 38 + "px"

      }).src = "images/Plants/gun/ShroomBulletHit.gif", oSym.addTask(10, ClearChild, [d])) : (e += 5) < oS.W ? (d.style.left = (g += 5) + "px", oSym.addTask(1, arguments.callee, [j, d, e, f, g])) : ClearChild(d)

    }, [c, $(c), a, b.R, a - 46])

  }

}), oSeaAnemone = InheritO(oGloomShroom, {

  EName: "oSeaAnemone",

  CName: "Electric Anemone",

  width: 83,

  height: 119,

  beAttackedPointR: 63,

  SunNum: 300,

  coolTime: 15,

  BookHandBack: 3.5,

  AudioArr: ["SeaAnemone"],

  PicArr: ["images/Card/Plants/SeaAnemone.png", "images/Plants/SeaAnemone/0.gif", "images/Plants/SeaAnemone/GloomShroom.gif", "images/Plants/SeaAnemone/GloomShroomSleep.gif", "images/Plants/SeaAnemone/GloomShroomAttack.gif", "images/Plants/SeaAnemone/GloomShroomBullet.gif"],

  AudioArr: ["kernelpult", "kernelpult2"],

  Tooltip: "The Electric Anemone can cause huge damage to zombies around it<br>",

  Produce: "Electric Anemone can cause great damage to the zombies around him</font></p>The confident Electric Anemone is not afraid of any difficulties, and has a killing horse</font><br>The special hairstyle is It's something he's proud of, but he said it was shaved by Master Wang at the entrance of the village last time.",

  BirthStyle: function(c, d, b, a) {

    EditEle(b, {

      id: d

    }, a, EDPZ)

  },

  CanGrow: function(e, d, f) {

    var c = d + "_" + f,

      b = oGd.$LF[d],

      a = f < 1 || f > 9;

    return b % 2 ? b < 3 ? !(a || e[1] || e[2] || e[0] || oGd.$Crater[c] || oGd.$Tombstones[c]) : !(a || e[0] || oGd.$Crater[c]) : 0

  },

  PrivateBirth: function(b) {

    var a = b.id;

    NewEle(a + "_Bullet", "div", "position:absolute;visibility:hidden;width:210px;height:200px;left:" + (b.pixelLeft - 60) + "px;top:" + (b.pixelTop - 65) + "px;background:url(images/Plants/SeaAnemone/GloomShroomBullet.gif);z-index:" + (b.zIndex + 1), 0, EDPZ)

  },

  NormalAttack: function() {

    PlayAudio("SeaAnemone");

    var k = this,

      g, f = k.MaxR,

      c = k.MinX,

      b = k.MaxX,

      e, h, a, j = k.id,

      d = $(j),

      l = j + "_Bullet";

    for (g = k.MinR; g <= f; g++) {

      e = oZ.getArZ(c, b, g);

      for (h = e.length; h--;

        (a = e[h]).Altitude < 2 && a.getHit1(a, 130)) {}

    }

    oSym.addTask(100, function(i) {

      PlayAudio(["kernelpult", "kernelpult2"][Math.floor(Math.random() * 2)]);

      --i && oSym.addTask(100, arguments.call,[i]);

    }, [4]);

    d.childNodes[1].src = "images/Plants/SeaAnemone/GloomShroomAttack.gif";

    SetVisible($(l));

    ImgSpriter(l, j, [

      ["0 0", 9, 1],

      ["0 -200px", 9, 2],

      ["0 -400px", 9, 3],

      ["0 -600px", 9, 4],

      ["0 -800px", 9, 5],

      ["0 -1000px", 9, 6],

      ["0 -1200px", 9, 7],

      ["0 -1400px", 9, 8],

      ["0 -1600px", 9, 9],

      ["0 -1800px", 9, 10],

      ["0 -2000px", 9, 11],

      ["0 -2200px", 9, -1]

    ], 0, function(m, n) {

      var i = $(n);

      $P[n] && (i.childNodes[1].src = "images/Plants/SeaAnemone/GloomShroom.gif");

      SetHidden($(m))

    })

  }

}), oTTS = InheritO(CPlants, {

  EName: "oTTS",

  CName: "Bramble Seaweed",

  width: 75,

  height: 226,

  beAttackedPointR: 55,

  beAttackedPointR: 80,

  SunNum: 25,

  BookHandBack: 3.5,

  GetDY: function(b, c, a) {

    return 5

  },

  NormalGif: 1,

  AudioArr: ["TTS"],

  PicArr: ["images/Card/Plants/TTS.png", "images/Plants/TTS/0.gif", "images/Plants/TTS/Float.gif", "images/Plants/TTS/Grab.png", "images/Plants/TTS/splash.png"],

  Tooltip: "Will grab anything close to him",

  Produce: 'Brambleweed will grab anything close to it and drag it </font><br>underground. <p>Damage: <font color="FF0000">Huge</font><br>Range: <font color="#FF0000">One ​​square</font><br>Usage: <font color="# FF0000">One-time use. </font></p>Bramble Seaweed's latest confession was preempted again, which </font><br>made him very sad. But he soon bounced back and learned</font><br>his lesson. Be sure to seize the opportunity! But he seems to have misunderstood this sentence</font><br>: He will hold on to whatever he encounters. ',

  CanGrow: function(e, d, f) {

    var c = d + "_" + f,

      b = oGd.$LF[d],

      a = f < 1 || f > 9;

    return b % 2 ? b < 3 ? !(a || e[1] || e[2] || e[0] || oGd.$Crater[c] || oGd.$Tombstones[c]) : !(a || e[0] || oGd.$Crater[c]) : 0

  },

  getTriggerRange: function(a, b, c) {

    return [

      [b, c, 0]

    ]

  },

  BirthStyle: function(c, d, b, a) {

    b.childNodes[1].src = "images/Plants/TTS/Float.gif";

    EditEle(b, {

      id: d

    }, a, EDPZ)

  },

  getHurt: function(d, b, a) {

    var c = this;

    b == 3 ? (c.HP -= a) < 1 && c.Die() : (c.canTrigger = 0, c.NormalAttack(c, d))

  },

  TriggerCheck: function(b, a) {

    b.AttackedLX < GetX(9) && b.beAttacked && (this.canTrigger = 0, this.NormalAttack(this, b))

  },

  NormalAttack: function(a, b) {

    PlayAudio("TTS");

    a.getHurt = function() {};

    b.getHurt = function() {};

    b.beAttacked = 0;

    b.isAttacking = 1;

    NewImg(0, "images/Plants/TTS/Grab.png", "left:" + b.beAttackedPointL + "px;top:" + (b.height - 67) + "px", b.Ele);

    oSym.addTask(50, function(g, h) {

      var e = g.id,

        f = h.id,

        d = e + "_splash",

        c = f + "_splash";

      NewEle(c, "div", "position:absolute;background:url(images/Plants/TTS/splash.png);left:" + (h.AttackedLX - 10) + "px;top:" + (h.pixelTop + h.height - 88) + "px;width:97px;height:88px;over-flow:hidden", 0, EDPZ);

      ImgSpriter(d, e, [

        ["0 0", 9, 1],

        ["-97px 0", 9, 2],

        ["-194px 0", 9, 3],

        ["-291px 0", 9, 4],

        ["-388px 0", 9, 5],

        ["-485px 0", 9, 6],

        ["-582px 0", 9, 7],

        ["-679px 0", 9, -1]

      ], 0, function(i, j) {

        ClearChild($(i))

      });

      ImgSpriter(c, f, [

        ["0 0", 9, 1],

        ["-97px 0", 9, 2],

        ["-194px 0", 9, 3],

        ["-291px 0", 9, 4],

        ["-388px 0", 9, 5],

        ["-485px 0", 9, 6],

        ["-582px 0", 9, 7],

        ["-679px 0", 9, -1]

      ], 0, function(i, j) {

        ClearChild($(i))

      });

      h.DisappearDie();

      g.Die()

    }, [a, b])

  }

}), oMagneticmuShroom = InheritO(CPlants, {

  EName: "oMagneticmuShroom",

  CName: "Magnetic Mushroom",

  width: 176,

  height: 148,

  beAttackedPointR: 50,

  SunNum: 50,

  BookHandBack: 2.5,

  AudioArr: ["Magneticmu"],

  PicArr: ["images/Card/Plants/MagneticmuShroom.png", "images/Plants/MagneticmuShroom/0.gif", "images/Plants/MagneticmuShroom/Shrubbery.gif", "images/Plants/MagneticmuShroom/ShrubberyBoom.gif" + $Random],

  Tooltip: "Magnetic mushrooms can use magnetic force to absorb zombie helmets and other metal objects.",

  Produce: 'Magnetic mushrooms can absorb the protective gear of surrounding zombies<p>Range: <font color="#FF0000">About one line</font><br>Usage: <font color="#FF0000">Place it immediately Can be used (disposable) </font></p> Magnetism is a powerful force, very powerful, so powerful that it </font><br> sometimes scares the Magnetic Mushroom itself. The greater the ability, the greater the responsibility. </font><br>He doesn't know whether he can shoulder this responsibility',

  InitTrigger: function() {},

  getHurt: function() {},

  PrivateBirth: function(a) {

    oSym.addTask(10, function(j) {

      var h = $P[j];

      if (h) {

        PlayAudio("Magneticmu");

        var b = $(j),

          f = h.R,

          c = oZ.getArZ(100, oS.W, f),

          e = c.length,

          g = oGd.$Ice[f],

          d = oGd.$Crater;

        while (e--) {

          if (c[e].EName == "oBucketheadZombie" || c[e].EName == "oFootballZombie" || c[e].EName == "oHeiFootballZombie" || c[e].EName == "oCFootballZombie" || c[e].EName == "oScreenDoorZombie" || c[e].EName == "oDuckyTubeZombie3" || c[e].EName == "oDuckyTubeZombie4" || c[e].EName == "oSmallFootballZombie" || c[e].EName == "oCBucketheadZombie" || c[e].EName == "oTrashZombie" || c[e].EName == "oCFootballZombie" || c[e].EName == "oConeheadZombie" || c[e].EName == "oCConeheadZombie" || c[e].EName == "oJY" || c[e].EName == "oBalloonZombie" || c[e].EName == "oNewspaperZombie" || c[e].EName == "oCNewspaperZombie" || c[e].EName == "oDuckyTubeZombie2") {

            c[e].OrnHP = 0;

            c[e].getHit0(c[e], 0, 0)

          }

        }

        h.Die(1);

        EditEle(b.childNodes[1], {

          src: "images/Plants/MagneticmuShroom/ShrubberyBoom.gif"

        }, {

          width: "176px",

          height: "148px",

          left: "-1px",

          top: "-1px"

        });

        oSym.addTask(220, ClearChild, [b])

      }

    }, [a.id])

  }

}), oLaserBean = InheritO(CPlants, {

  EName: "oLaserBean",

  CName: "Laser Broad Bean",

  width: 80,

  height: 80,

  beAttackedPointR: 80,

  SunNum: 75,

  SunNum: 450,

  coolTime: 30,

  HP: 4e3,

  PicArr: ["images/Card/Plants/LaserBean.png", "images/Plants/LaserPea/0.gif", "images/Plants/LaserPea/LaserPea.gif", "images/Plants/LaserPea/LaserPeaSleep.gif", "images/Plants/LaserPea/LaserPeaAttack.gif", "images/Plants/LaserPea/LaserPeaBullet.gif"],

  AudioArr: ["LaserBean"],

  Tooltip: "Fire a high-powered laser at an entire row of zombies.",

  Produce: 'Laser broad beans fire lasers at an entire row of zombies<p>Range: <font color="#FF0000">A whole row of zombies<p>This bean is drawn by Shanghai Baokai<br></font><p> <br>This is the famous Laser Bean. But why is he a</font><br>bava bean? I'm afraid no one can figure it out. ',

  CheckLoop: function(b, c) {

    var a = this.id;

    this.NormalAttack(b);

    oSym.addTask(292, function(e, f, h) {

      var g;

      (g = $P[e]) && g.AttackCheck1(f, h)

    }, [a, b, c])

  },

  getShadow: function(a) {

    return "left:" + (a.width * .5 - +20) + "px;top:" + (a.height - 22) + "px"

  },

  GetDY: function(b, c, a) {

    return a[0] ? -18 : -10

  },

  GetDX: function() {

    return -68

  },

  PrivateBirth: function(b) {

    var a = b.id;

    NewEle(a + "_Bullet", "div", "position:absolute;visibility:hidden;width:343px;height:62px;left:" + b.AttackedRX + "px;top:" + (b.pixelTop + 5) + "px;background:url(images/Plants/LaserPea/LaserPeaBullet.gif);z-index:" + (b.zIndex + 1), 0, EDPZ)

  },

  PrivateDie: function(a) {

    ClearChild($(a.id + "_Bullet"))

  },

  getTriggerRange: function(a, b, c) {

    return [

      [b, Math.min(c + 686, oS.W), 0]

    ]

  },

  NormalAttack: function() {

    PlayAudio("LaserBean");

    var f = this,

      d = oZ.getArZ(f.AttackedLX, Math.min(f.AttackedRX + 686, oS.W), f.R),

      e = d.length,

      g, c = f.id,

      b = $(c),

      a = c + "_Bullet";

    while (e--) {

      (g = d[e]).Altitude < 2 && g.getHit1(g, 850)

    }

    b.childNodes[1].src = "images/Plants/LaserPea/LaserPeaAttack.gif";

    SetVisible($(a));

    ImgSpriter(a, c, [

      ["0 0", 4, 1],

      ["0 -62px", 4, 2],

      ["0 -124px", 5, 3],

      ["0 -186px", 5, 4],

      ["0 -248px", 5, 5],

      ["0 -310px", 6, 6],

      ["0 -372px", 6, 7],

      ["0 -434px", 7, -1]

    ], 0, function(i, j) {

      var h = $(j);

      $P[j] && (h.childNodes[1].src = "images/Plants/LaserPea/LaserPea.gif", SetHidden($(i)))

    })

  }

}), oGoldenPrize = InheritO(CPlants, {

  EName: "oGoldenPrize",

  CName: "Golden Sunflower Trophy",

  PicArr: ["images/interface/0.gif", "images/interface/0.gif"],

  Tooltip: "Congratulations on passing this challenge!"

}), oShovel = InheritO(CPlants, {

  EName: "oShovel",

  CName: "Shovel",

  width: 130,

  height: 114,

  beAttackedPointR: 70,

  PicArr: ["images/interface/Shovel/0.gif", "images/interface/Shovel/0.gif"],

  Tooltip: "A shovel can remove plants!"

});
