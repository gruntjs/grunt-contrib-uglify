(function(n, t) {
    function e(n) {
        return n && n.__wrapped__ ? n : this instanceof e ? (this.__wrapped__ = n, t) : new e(n);
    }
    function r(n, t, e) {
        t || (t = 0);
        var r = n.length, u = r - t >= (e || ee);
        if (u) for (var a = {}, o = t - 1; r > ++o; ) {
            var i = n[o] + "";
            (je.call(a, i) ? a[i] : a[i] = []).push(n[o]);
        }
        return function(e) {
            if (u) {
                var r = e + "";
                return je.call(a, r) && lt(a[r], e) > -1;
            }
            return lt(n, e, t) > -1;
        };
    }
    function u(n) {
        return n.charCodeAt(0);
    }
    function a(n, e) {
        var r = n.index, u = e.index;
        if (n = n.criteria, e = e.criteria, n !== e) {
            if (n > e || n === t) return 1;
            if (e > n || e === t) return -1;
        }
        return u > r ? -1 : 1;
    }
    function o(n, t, e) {
        function r() {
            var i = arguments, c = a ? this : t;
            if (u || (n = t[o]), e.length && (i = i.length ? e.concat(Oe.call(i)) : e), this instanceof r) {
                s.prototype = n.prototype, c = new s();
                var l = n.apply(c, i);
                return k(l) ? l : c;
            }
            return n.apply(c, i);
        }
        var u = O(n), a = !e, o = n;
        return a && (e = t), r;
    }
    function i(n, e) {
        return n ? "function" != typeof n ? function(t) {
            return t[n];
        } : e !== t ? function(t, r, u) {
            return n.call(e, t, r, u);
        } : n : Tt;
    }
    function c() {
        for (var n, t = {
            arrayLoop: "",
            bottom: "",
            hasDontEnumBug: Xt,
            isKeysFast: Ze,
            objectLoop: "",
            noArgsEnum: Ve,
            noCharByIndex: Qe,
            shadowed: _e,
            top: "",
            useHas: !0
        }, e = 0; n = arguments[e]; e++) for (var r in n) t[r] = n[r];
        var u = t.args;
        t.firstArg = /^[^,]+/.exec(u)[0];
        var a = Function("createCallback, hasOwnProperty, isArguments, isString, objectTypes, nativeKeys, propertyIsEnumerable", "return function(" + u + ") {\n" + ur(t) + "\n}");
        return a(i, je, g, D, er, De, Ae);
    }
    function l(n) {
        return "\\" + rr[n];
    }
    function f(n) {
        return fr[n];
    }
    function s() {}
    function p(n) {
        return sr[n];
    }
    function g(n) {
        return ke.call(n) == Te;
    }
    function h(n) {
        var t = !1;
        if (!n || "object" != typeof n || g(n)) return t;
        var e = n.constructor;
        return We && "function" != typeof n.toString && "string" == typeof (n + "") || O(e) && !(e instanceof e) ? t : Yt ? (cr(n, function(n, e, r) {
            return t = !je.call(r, e), !1;
        }), t === !1) : (cr(n, function(n, e) {
            t = e;
        }), t === !1 || je.call(n, t));
    }
    function v(n) {
        var t = [];
        return lr(n, function(n, e) {
            t.push(e);
        }), t;
    }
    function y(n, t, e, r, u) {
        if (null == n) return n;
        e && (t = !1);
        var a = k(n);
        if (a) {
            var o = ke.call(n);
            if (!tr[o] || Ge && g(n)) return n;
            var i = o == Re;
            a = i || (o == Me ? vr(n) : a);
        }
        if (!a || !t) return a ? i ? Oe.call(n) : gr({}, n) : n;
        var c = n.constructor;
        switch (o) {
          case He:
          case Ne:
            return new c(+n);

          case Ce:
          case ze:
            return new c(n);

          case Ke:
            return c(n.source, le.exec(n));
        }
        r || (r = []), u || (u = []);
        for (var l = r.length; l--; ) if (r[l] == n) return u[l];
        var f = i ? c(n.length) : {};
        return r.push(n), u.push(f), (i ? _r : lr)(n, function(n, e) {
            f[e] = y(n, t, null, r, u);
        }), f;
    }
    function _(n) {
        var t = [];
        return cr(n, function(n, e) {
            O(n) && t.push(e);
        }), t.sort();
    }
    function m(n, t) {
        return n ? je.call(n, t) : !1;
    }
    function d(n) {
        var t = {};
        return lr(n, function(n, e) {
            t[n] = e;
        }), t;
    }
    function b(n) {
        return n === !0 || n === !1 || ke.call(n) == He;
    }
    function x(n) {
        return ke.call(n) == Ne;
    }
    function w(n) {
        return n ? 1 === n.nodeType : !1;
    }
    function j(n) {
        var t = !0;
        if (!n) return t;
        var e = ke.call(n), r = n.length;
        return e == Re || e == ze || e == Te || Ge && g(n) || e == Me && "number" == typeof r && O(n.splice) ? !r : (lr(n, function() {
            return t = !1;
        }), t);
    }
    function E(n, t, e, r) {
        if (n === t) return 0 !== n || 1 / n == 1 / t;
        if (null == n || null == t) return n === t;
        var u = ke.call(n);
        if (u != ke.call(t)) return !1;
        switch (u) {
          case He:
          case Ne:
            return +n == +t;

          case Ce:
            return n != +n ? t != +t : 0 == n ? 1 / n == 1 / t : n == +t;

          case Ke:
          case ze:
            return n == t + "";
        }
        var a = u == Re || u == Te;
        if (Ge && !a && (a = g(n)) && !g(t)) return !1;
        if (!a) {
            if (n.__wrapped__ || t.__wrapped__) return E(n.__wrapped__ || n, t.__wrapped__ || t);
            if (u != Me || We && ("function" != typeof n.toString && "string" == typeof (n + "") || "function" != typeof t.toString && "string" == typeof (t + ""))) return !1;
            var o = n.constructor, i = t.constructor;
            if (o != i && !(O(o) && o instanceof o && O(i) && i instanceof i)) return !1;
        }
        e || (e = []), r || (r = []);
        for (var c = e.length; c--; ) if (e[c] == n) return r[c] == t;
        var l = -1, f = !0, s = 0;
        if (e.push(n), r.push(t), a) {
            if (s = n.length, f = s == t.length) for (;s-- && (f = E(n[s], t[s], e, r)); ) ;
            return f;
        }
        for (var p in n) if (je.call(n, p) && (s++, !je.call(t, p) || !E(n[p], t[p], e, r))) return !1;
        for (p in t) if (je.call(t, p) && !s--) return !1;
        if (Xt) for (;7 > ++l; ) if (p = _e[l], je.call(n, p) && (!je.call(t, p) || !E(n[p], t[p], e, r))) return !1;
        return !0;
    }
    function A(n) {
        return Se(n) && !Be(parseFloat(n));
    }
    function O(n) {
        return "function" == typeof n;
    }
    function k(n) {
        return n ? er[typeof n] : !1;
    }
    function L(n) {
        return ke.call(n) == Ce && n != +n;
    }
    function I(n) {
        return null === n;
    }
    function S(n) {
        return ke.call(n) == Ce;
    }
    function B(n) {
        return ke.call(n) == Ke;
    }
    function D(n) {
        return ke.call(n) == ze;
    }
    function P(n) {
        return n === t;
    }
    function $(n, t, e) {
        var r = arguments, u = 0, a = 2, o = r[3], i = r[4];
        for (e !== ne && (o = [], i = [], a = r.length); a > ++u; ) lr(r[u], function(t, e) {
            var r, u, a;
            if (t && ((u = hr(t)) || vr(t))) {
                for (var c = o.length; c-- && !(r = o[c] == t); ) ;
                r ? n[e] = i[c] : (o.push(t), i.push((a = n[e], a = u ? hr(a) ? a : [] : vr(a) ? a : {})), 
                n[e] = $(a, t, ne, o, i));
            } else null != t && (n[e] = t);
        });
        return n;
    }
    function F(n, t, e) {
        var r = "function" == typeof t, u = {};
        if (r) t = i(t, e); else var a = be.apply(Zt, arguments);
        return cr(n, function(n, e, o) {
            (r ? !t(n, e, o) : 0 > lt(a, e, 1)) && (u[e] = n);
        }), u;
    }
    function T(n) {
        var t = [];
        return lr(n, function(n, e) {
            t.push([ e, n ]);
        }), t;
    }
    function R(n, t, e) {
        var r = {};
        if ("function" != typeof t) for (var u = 0, a = be.apply(Zt, arguments), o = a.length; o > ++u; ) {
            var c = a[u];
            c in n && (r[c] = n[c]);
        } else t = i(t, e), cr(n, function(n, e, u) {
            t(n, e, u) && (r[e] = n);
        });
        return r;
    }
    function H(n) {
        var t = [];
        return lr(n, function(n) {
            t.push(n);
        }), t;
    }
    function N(n, t, e) {
        var r = -1, u = n ? n.length : 0;
        return e = (0 > e ? Pe(0, u + e) : e) || 0, "number" == typeof u ? (D(n) ? n.indexOf(t, e) : lt(n, t, e)) > -1 : tt(n, function(n) {
            return ++r >= e && n === t;
        });
    }
    function q(n, t, e) {
        var r = {};
        return t = i(t, e), _r(n, function(n, e, u) {
            e = t(n, e, u), je.call(r, e) ? r[e]++ : r[e] = 1;
        }), r;
    }
    function C(n, t, e) {
        var r = !0;
        if (t = i(t, e), hr(n)) for (var u = -1, a = n.length; a > ++u && (r = !!t(n[u], u, n)); ) ; else _r(n, function(n, e, u) {
            return r = !!t(n, e, u);
        });
        return r;
    }
    function M(n, t, e) {
        var r = [];
        return t = i(t, e), _r(n, function(n, e, u) {
            t(n, e, u) && r.push(n);
        }), r;
    }
    function K(n, e, r) {
        var u;
        return e = i(e, r), _r(n, function(n, r, a) {
            return e(n, r, a) ? (u = n, !1) : t;
        }), u;
    }
    function z(n, t, e) {
        var r = {};
        return t = i(t, e), _r(n, function(n, e, u) {
            e = t(n, e, u), (je.call(r, e) ? r[e] : r[e] = []).push(n);
        }), r;
    }
    function U(n, t) {
        var e = Oe.call(arguments, 2), r = "function" == typeof t, u = [];
        return _r(n, function(n) {
            u.push((r ? t : n[t]).apply(n, e));
        }), u;
    }
    function V(n, t, e) {
        var r = -1, u = n ? n.length : 0, a = Array("number" == typeof u ? u : 0);
        if (t = i(t, e), hr(n)) for (;u > ++r; ) a[r] = t(n[r], r, n); else _r(n, function(n, e, u) {
            a[++r] = t(n, e, u);
        });
        return a;
    }
    function G(n, t, e) {
        var r = -1/0, a = -1, o = n ? n.length : 0, c = r;
        if (t || !hr(n)) t = !t && D(n) ? u : i(t, e), _r(n, function(n, e, u) {
            var a = t(n, e, u);
            a > r && (r = a, c = n);
        }); else for (;o > ++a; ) n[a] > c && (c = n[a]);
        return c;
    }
    function J(n, t, e) {
        var r = 1/0, a = -1, o = n ? n.length : 0, c = r;
        if (t || !hr(n)) t = !t && D(n) ? u : i(t, e), _r(n, function(n, e, u) {
            var a = t(n, e, u);
            r > a && (r = a, c = n);
        }); else for (;o > ++a; ) c > n[a] && (c = n[a]);
        return c;
    }
    function Q(n, t) {
        var e = [];
        return _r(n, function(n) {
            e.push(n[t]);
        }), e;
    }
    function W(n, t, e, r) {
        var u = 3 > arguments.length;
        return t = i(t, r), _r(n, function(n, r, a) {
            e = u ? (u = !1, n) : t(e, n, r, a);
        }), e;
    }
    function X(n, t, e, r) {
        var u = n, a = n ? n.length : 0, o = 3 > arguments.length;
        if ("number" != typeof a) {
            var i = yr(n);
            a = i.length;
        } else Qe && D(n) && (u = n.split(""));
        return _r(n, function(n, c, l) {
            c = i ? i[--a] : --a, e = o ? (o = !1, u[c]) : t.call(r, e, u[c], c, l);
        }), e;
    }
    function Y(n, t, e) {
        return t = i(t, e), M(n, function(n, e, r) {
            return !t(n, e, r);
        });
    }
    function Z(n) {
        var t = -1, e = Array(n ? n.length : 0);
        return _r(n, function(n) {
            var r = xe(Fe() * (++t + 1));
            e[t] = e[r], e[r] = n;
        }), e;
    }
    function nt(n) {
        var t = n ? n.length : 0;
        return "number" == typeof t ? t : yr(n).length;
    }
    function tt(n, t, e) {
        var r;
        if (t = i(t, e), hr(n)) for (var u = -1, a = n.length; a > ++u && !(r = t(n[u], u, n)); ) ; else _r(n, function(n, e, u) {
            return !(r = t(n, e, u));
        });
        return !!r;
    }
    function et(n, t, e) {
        var r = [];
        t = i(t, e), _r(n, function(n, e, u) {
            r.push({
                criteria: t(n, e, u),
                index: e,
                value: n
            });
        });
        var u = r.length;
        for (r.sort(a); u--; ) r[u] = r[u].value;
        return r;
    }
    function rt(n) {
        return n && "number" == typeof n.length ? (Je ? D(n) : "string" == typeof n) ? n.split("") : Oe.call(n) : H(n);
    }
    function ut(n, t) {
        var e = [];
        return cr(t, function(n, t) {
            e.push(t);
        }), M(n, function(n) {
            for (var r = e.length; r--; ) {
                var u = n[e[r]] === t[e[r]];
                if (!u) break;
            }
            return !!u;
        });
    }
    function at(n) {
        for (var t = -1, e = n ? n.length : 0, r = []; e > ++t; ) {
            var u = n[t];
            u && r.push(u);
        }
        return r;
    }
    function ot(n) {
        for (var t = -1, e = n ? n.length : 0, u = be.apply(Zt, arguments), a = r(u, e), o = []; e > ++t; ) {
            var i = n[t];
            a(i) || o.push(i);
        }
        return o;
    }
    function it(n, e, r) {
        return n ? null == e || r ? n[0] : Oe.call(n, 0, e) : t;
    }
    function ct(n, t) {
        for (var e = -1, r = n ? n.length : 0, u = []; r > ++e; ) {
            var a = n[e];
            hr(a) ? Ee.apply(u, t ? a : ct(a)) : u.push(a);
        }
        return u;
    }
    function lt(n, t, e) {
        var r = -1, u = n ? n.length : 0;
        if ("number" == typeof e) r = (0 > e ? Pe(0, u + e) : e || 0) - 1; else if (e) return r = _t(n, t), 
        n[r] === t ? r : -1;
        for (;u > ++r; ) if (n[r] === t) return r;
        return -1;
    }
    function ft(n, t, e) {
        return n ? Oe.call(n, 0, -(null == t || e ? 1 : t)) : [];
    }
    function st(n) {
        var t = arguments, e = t.length, u = {}, a = [];
        return _r(n, function(n) {
            if (0 > lt(a, n)) {
                for (var o = e; --o; ) if (!(u[o] || (u[o] = r(t[o])))(n)) return;
                a.push(n);
            }
        }), a;
    }
    function pt(n, t, e) {
        if (n) {
            var r = n.length;
            return null == t || e ? n[r - 1] : Oe.call(n, -t || r);
        }
    }
    function gt(n, t, e) {
        var r = n ? n.length : 0;
        for ("number" == typeof e && (r = (0 > e ? Pe(0, r + e) : $e(e, r - 1)) + 1); r--; ) if (n[r] === t) return r;
        return -1;
    }
    function ht(n, t) {
        for (var e = -1, r = n ? n.length : 0, u = {}; r > ++e; ) {
            var a = n[e];
            t ? u[a] = t[e] : u[a[0]] = a[1];
        }
        return u;
    }
    function vt(n, t, e) {
        n = +n || 0, e = +e || 1, null == t && (t = n, n = 0);
        for (var r = -1, u = Pe(0, de((t - n) / e)), a = Array(u); u > ++r; ) a[r] = n, 
        n += e;
        return a;
    }
    function yt(n, t, e) {
        return n ? Oe.call(n, null == t || e ? 1 : t) : [];
    }
    function _t(n, t, e, r) {
        var u = 0, a = n ? n.length : u;
        for (e = e ? i(e, r) : Tt, t = e(t); a > u; ) {
            var o = u + a >>> 1;
            t > e(n[o]) ? u = o + 1 : a = o;
        }
        return u;
    }
    function mt() {
        return dt(be.apply(Zt, arguments));
    }
    function dt(n, t, e, r) {
        var u = -1, a = n ? n.length : 0, o = [], c = o;
        "function" == typeof t && (r = e, e = t, t = !1);
        var l = !t && a > 74;
        if (l) var f = {};
        for (e && (c = [], e = i(e, r)); a > ++u; ) {
            var s = n[u], p = e ? e(s, u, n) : s;
            l && (c = je.call(f, p + "") ? f[p] : f[p] = []), (t ? !u || c[c.length - 1] !== p : 0 > lt(c, p)) && ((e || l) && c.push(p), 
            o.push(s));
        }
        return o;
    }
    function bt(n) {
        for (var t = -1, e = n ? n.length : 0, u = r(arguments, 1, 20), a = []; e > ++t; ) {
            var o = n[t];
            u(o) || a.push(o);
        }
        return a;
    }
    function xt(n) {
        for (var t = -1, e = n ? G(Q(arguments, "length")) : 0, r = Array(e); e > ++t; ) r[t] = Q(arguments, t);
        return r;
    }
    function wt(n, e) {
        return 1 > n ? e() : function() {
            return 1 > --n ? e.apply(this, arguments) : t;
        };
    }
    function jt(n, t) {
        return Ye || Le && arguments.length > 2 ? Le.call.apply(Le, arguments) : o(n, t, Oe.call(arguments, 2));
    }
    function Et(n) {
        for (var t = arguments, e = t.length > 1 ? 0 : (t = _(n), -1), r = t.length; r > ++e; ) {
            var u = t[e];
            n[u] = jt(n[u], n);
        }
        return n;
    }
    function At() {
        var n = arguments;
        return function() {
            for (var t = arguments, e = n.length; e--; ) t = [ n[e].apply(this, t) ];
            return t[0];
        };
    }
    function Ot(n, t, e) {
        function r() {
            i = null, e || (a = n.apply(o, u));
        }
        var u, a, o, i;
        return function() {
            var c = e && !i;
            return u = arguments, o = this, clearTimeout(i), i = setTimeout(r, t), c && (a = n.apply(o, u)), 
            a;
        };
    }
    function kt(n, e) {
        var r = Oe.call(arguments, 2);
        return setTimeout(function() {
            n.apply(t, r);
        }, e);
    }
    function Lt(n) {
        var e = Oe.call(arguments, 1);
        return setTimeout(function() {
            n.apply(t, e);
        }, 1);
    }
    function It(n, t) {
        return o(t, n, Oe.call(arguments, 2));
    }
    function St(n, t) {
        var e = {};
        return function() {
            var r = t ? t.apply(this, arguments) : arguments[0];
            return je.call(e, r) ? e[r] : e[r] = n.apply(this, arguments);
        };
    }
    function Bt(n) {
        var t, e = !1;
        return function() {
            return e ? t : (e = !0, t = n.apply(this, arguments), n = null, t);
        };
    }
    function Dt(n) {
        return o(n, Oe.call(arguments, 1));
    }
    function Pt(n, t) {
        function e() {
            i = new Date(), o = null, u = n.apply(a, r);
        }
        var r, u, a, o, i = 0;
        return function() {
            var c = new Date(), l = t - (c - i);
            return r = arguments, a = this, 0 >= l ? (clearTimeout(o), i = c, u = n.apply(a, r)) : o || (o = setTimeout(e, l)), 
            u;
        };
    }
    function $t(n, t) {
        return function() {
            var e = [ n ];
            return Ee.apply(e, arguments), t.apply(this, e);
        };
    }
    function Ft(n) {
        return null == n ? "" : (n + "").replace(ve, f);
    }
    function Tt(n) {
        return n;
    }
    function Rt(n) {
        _r(_(n), function(t) {
            var r = e[t] = n[t];
            e.prototype[t] = function() {
                var n = [ this.__wrapped__ ];
                Ee.apply(n, arguments);
                var t = r.apply(e, n);
                return this.__chain__ && (t = new e(t), t.__chain__ = !0), t;
            };
        });
    }
    function Ht() {
        return n._ = re, this;
    }
    function Nt(n, t) {
        return null == n && null == t && (t = 1), n = +n || 0, null == t && (t = n, n = 0), 
        n + xe(Fe() * ((+t || 0) - n + 1));
    }
    function qt(n, t) {
        var e = n ? n[t] : null;
        return O(e) ? n[t]() : e;
    }
    function Ct(n, t, r) {
        n || (n = ""), r || (r = {});
        var u, a, o = e.templateSettings, i = 0, c = r.interpolate || o.interpolate || he, f = "__p += '", s = r.variable || o.variable, p = s, g = RegExp((r.escape || o.escape || he).source + "|" + c.source + "|" + (c === ge ? pe : he).source + "|" + (r.evaluate || o.evaluate || he).source + "|$", "g");
        if (n.replace(g, function(t, e, r, a, o, c) {
            r || (r = a), f += n.slice(i, c).replace(ye, l), f += e ? "' +\n__e(" + e + ") +\n'" : o ? "';\n" + o + ";\n__p += '" : r ? "' +\n((__t = (" + r + ")) == null ? '' : __t) +\n'" : "", 
            u || (u = o || ue.test(e || r)), i = c + t.length;
        }), f += "';\n", !p) if (s = "obj", u) f = "with (" + s + ") {\n" + f + "\n}\n"; else {
            var h = RegExp("(\\(\\s*)" + s + "\\." + s + "\\b", "g");
            f = f.replace(fe, "$&" + s + ".").replace(h, "$1__d");
        }
        f = (u ? f.replace(oe, "") : f).replace(ie, "$1").replace(ce, "$1;"), f = "function(" + s + ") {\n" + (p ? "" : s + " || (" + s + " = {});\n") + "var __t, __p = '', __e = _.escape" + (u ? ", __j = Array.prototype.join;\nfunction print() { __p += __j.call(arguments, '') }\n" : (p ? "" : ", __d = " + s + "." + s + " || " + s) + ";\n") + f + "return __p\n}";
        var v = nr ? "\n//@ sourceURL=" + (r.sourceURL || "/lodash/template/source[" + me++ + "]") : "";
        try {
            a = Function("_", "return " + f + v)(e);
        } catch (y) {
            throw y.source = f, y;
        }
        return t ? a(t) : (a.source = f, a);
    }
    function Mt(n, t, e) {
        n = +n || 0;
        for (var r = -1, u = Array(n); n > ++r; ) u[r] = t.call(e, r);
        return u;
    }
    function Kt(n) {
        return null == n ? "" : (n + "").replace(ae, p);
    }
    function zt(n) {
        var t = te++;
        return n ? n + t : t;
    }
    function Ut(n) {
        return n = new e(n), n.__chain__ = !0, n;
    }
    function Vt(n, t) {
        return t(n), n;
    }
    function Gt() {
        return this.__chain__ = !0, this;
    }
    function Jt() {
        return this.__wrapped__;
    }
    var Qt = "object" == typeof exports && exports, Wt = "object" == typeof global && global;
    Wt.global === Wt && (n = Wt);
    var Xt, Yt, Zt = [], ne = new function() {}(), te = 0, ee = 30, re = n._, ue = /[-?+=!~*%&^<>|{(\/]|\[\D|\b(?:delete|in|instanceof|new|typeof|void)\b/, ae = /&(?:amp|lt|gt|quot|#x27);/g, oe = /\b__p \+= '';/g, ie = /\b(__p \+=) '' \+/g, ce = /(__e\(.*?\)|\b__t\)) \+\n'';/g, le = /\w*$/, fe = /(?:__e|__t = )\(\s*(?![\d\s"']|this\.)/g, se = RegExp("^" + (ne.valueOf + "").replace(/[.*+?^=!:${}()|[\]\/\\]/g, "\\$&").replace(/valueOf|for [^\]]+/g, ".+?") + "$"), pe = /\$\{((?:(?=\\?)\\?[\s\S])*?)}/g, ge = /<%=([\s\S]+?)%>/g, he = /($^)/, ve = /[&<>"']/g, ye = /['\n\r\t\u2028\u2029\\]/g, _e = [ "constructor", "hasOwnProperty", "isPrototypeOf", "propertyIsEnumerable", "toLocaleString", "toString", "valueOf" ], me = 0, de = Math.ceil, be = Zt.concat, xe = Math.floor, we = se.test(we = Object.getPrototypeOf) && we, je = ne.hasOwnProperty, Ee = Zt.push, Ae = ne.propertyIsEnumerable, Oe = Zt.slice, ke = ne.toString, Le = se.test(Le = Oe.bind) && Le, Ie = se.test(Ie = Array.isArray) && Ie, Se = n.isFinite, Be = n.isNaN, De = se.test(De = Object.keys) && De, Pe = Math.max, $e = Math.min, Fe = Math.random, Te = "[object Arguments]", Re = "[object Array]", He = "[object Boolean]", Ne = "[object Date]", qe = "[object Function]", Ce = "[object Number]", Me = "[object Object]", Ke = "[object RegExp]", ze = "[object String]", Ue = (Ue = {
        "0": 1,
        length: 1
    }, Zt.splice.call(Ue, 0, 1), Ue[0]), Ve = !0;
    (function() {
        function n() {
            this.x = 1;
        }
        var t = [];
        n.prototype = {
            valueOf: 1,
            y: 1
        };
        for (var e in new n()) t.push(e);
        for (e in arguments) Ve = !e;
        Xt = !/valueOf/.test(t), Yt = "x" != t[0];
    })(1);
    var Ge = !g(arguments), Je = "x" != Oe.call("x")[0], Qe = "xx" != "x"[0] + Object("x")[0];
    try {
        var We = ke.call(n.document || 0) == Me;
    } catch (Xe) {}
    var Ye = Le && /\n|Opera/.test(Le + ke.call(n.opera)), Ze = De && /^.+$|true/.test(De + !!n.attachEvent);
    try {
        var nr = (Function("//@")(), !n.attachEvent);
    } catch (Xe) {}
    var tr = {};
    tr[Te] = tr[qe] = !1, tr[Re] = tr[He] = tr[Ne] = tr[Ce] = tr[Me] = tr[Ke] = tr[ze] = !0;
    var er = {
        "boolean": !1,
        "function": !0,
        object: !0,
        number: !1,
        string: !1,
        undefined: !1
    }, rr = {
        "\\": "\\",
        "'": "'",
        "\n": "n",
        "\r": "r",
        "	": "t",
        "\u2028": "u2028",
        "\u2029": "u2029"
    };
    e.templateSettings = {
        escape: /<%-([\s\S]+?)%>/g,
        evaluate: /<%([\s\S]+?)%>/g,
        interpolate: ge,
        variable: ""
    };
    var ur = Ct("<% if (obj.useStrict) { %>'use strict';\n<% } %>var index, value, iteratee = <%= firstArg %>, result = <%= firstArg %>;\nif (!<%= firstArg %>) return result;\n<%= top %>;\n<% if (arrayLoop) { %>var length = iteratee.length; index = -1;\nif (typeof length == 'number') {  <% if (noCharByIndex) { %>\n  if (isString(iteratee)) {\n    iteratee = iteratee.split('')\n  }  <% } %>\n  while (++index < length) {\n    value = iteratee[index];\n    <%= arrayLoop %>\n  }\n}\nelse {  <%  } else if (noArgsEnum) { %>\n  var length = iteratee.length; index = -1;\n  if (length && isArguments(iteratee)) {\n    while (++index < length) {\n      value = iteratee[index += ''];\n      <%= objectLoop %>\n    }\n  } else {  <% } %>  <% if (!hasDontEnumBug) { %>\n  var skipProto = typeof iteratee == 'function' && \n    propertyIsEnumerable.call(iteratee, 'prototype');\n  <% } %>  <% if (isKeysFast && useHas) { %>\n  var ownIndex = -1,\n      ownProps = objectTypes[typeof iteratee] ? nativeKeys(iteratee) : [],\n      length = ownProps.length;\n\n  while (++ownIndex < length) {\n    index = ownProps[ownIndex];\n    <% if (!hasDontEnumBug) { %>if (!(skipProto && index == 'prototype')) {\n  <% } %>    value = iteratee[index];\n    <%= objectLoop %>\n    <% if (!hasDontEnumBug) { %>}\n<% } %>  }  <% } else { %>\n  for (index in iteratee) {<%    if (!hasDontEnumBug || useHas) { %>\n    if (<%      if (!hasDontEnumBug) { %>!(skipProto && index == 'prototype')<% }      if (!hasDontEnumBug && useHas) { %> && <% }      if (useHas) { %>hasOwnProperty.call(iteratee, index)<% }    %>) {    <% } %>\n    value = iteratee[index];\n    <%= objectLoop %>;    <% if (!hasDontEnumBug || useHas) { %>\n    }<% } %>\n  }  <% } %>  <% if (hasDontEnumBug) { %>\n\n  var ctor = iteratee.constructor;\n    <% for (var k = 0; k < 7; k++) { %>\n  index = '<%= shadowed[k] %>';\n  if (<%      if (shadowed[k] == 'constructor') {        %>!(ctor && ctor.prototype === iteratee) && <%      } %>hasOwnProperty.call(iteratee, index)) {\n    value = iteratee[index];\n    <%= objectLoop %>\n  }    <% } %>  <% } %>  <% if (arrayLoop || noArgsEnum) { %>\n}<% } %>\n<%= bottom %>;\nreturn result"), ar = {
        args: "collection, callback, thisArg",
        top: "callback = createCallback(callback, thisArg)",
        arrayLoop: "if (callback(value, index, collection) === false) return result",
        objectLoop: "if (callback(value, index, collection) === false) return result"
    }, or = {
        useHas: !1,
        args: "object",
        top: "for (var argsIndex = 1, argsLength = arguments.length; argsIndex < argsLength; argsIndex++) {\n  if (iteratee = arguments[argsIndex]) {",
        objectLoop: "result[index] = value",
        bottom: "  }\n}"
    }, ir = {
        arrayLoop: null
    };
    Ge && (g = function(n) {
        return n ? je.call(n, "callee") : !1;
    });
    var cr = c(ar, ir, {
        useHas: !1
    }), lr = c(ar, ir), fr = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#x27;"
    }, sr = d(fr), pr = c(or, {
        objectLoop: "if (result[index] == null) " + or.objectLoop
    }), gr = c(or), hr = Ie || function(n) {
        return ke.call(n) == Re;
    };
    O(/x/) && (O = function(n) {
        return ke.call(n) == qe;
    });
    var vr = we ? function(n) {
        if (!n || "object" != typeof n) return !1;
        var t = n.valueOf, e = "function" == typeof t && (e = we(t)) && we(e);
        return e ? n == e || we(n) == e && !g(n) : h(n);
    } : h, yr = De ? function(n) {
        return "function" == typeof n && Ae.call(n, "prototype") ? v(n) : k(n) ? De(n) : [];
    } : v, _r = c(ar);
    e.VERSION = "0.9.2", e.after = wt, e.bind = jt, e.bindAll = Et, e.chain = Ut, e.clone = y, 
    e.compact = at, e.compose = At, e.contains = N, e.countBy = q, e.debounce = Ot, 
    e.defaults = pr, e.defer = Lt, e.delay = kt, e.difference = ot, e.escape = Ft, e.every = C, 
    e.extend = gr, e.filter = M, e.find = K, e.first = it, e.flatten = ct, e.forEach = _r, 
    e.forIn = cr, e.forOwn = lr, e.functions = _, e.groupBy = z, e.has = m, e.identity = Tt, 
    e.indexOf = lt, e.initial = ft, e.intersection = st, e.invert = d, e.invoke = U, 
    e.isArguments = g, e.isArray = hr, e.isBoolean = b, e.isDate = x, e.isElement = w, 
    e.isEmpty = j, e.isEqual = E, e.isFinite = A, e.isFunction = O, e.isNaN = L, e.isNull = I, 
    e.isNumber = S, e.isObject = k, e.isPlainObject = vr, e.isRegExp = B, e.isString = D, 
    e.isUndefined = P, e.keys = yr, e.last = pt, e.lastIndexOf = gt, e.lateBind = It, 
    e.map = V, e.max = G, e.memoize = St, e.merge = $, e.min = J, e.mixin = Rt, e.noConflict = Ht, 
    e.object = ht, e.omit = F, e.once = Bt, e.pairs = T, e.partial = Dt, e.pick = R, 
    e.pluck = Q, e.random = Nt, e.range = vt, e.reduce = W, e.reduceRight = X, e.reject = Y, 
    e.rest = yt, e.result = qt, e.shuffle = Z, e.size = nt, e.some = tt, e.sortBy = et, 
    e.sortedIndex = _t, e.tap = Vt, e.template = Ct, e.throttle = Pt, e.times = Mt, 
    e.toArray = rt, e.unescape = Kt, e.union = mt, e.uniq = dt, e.uniqueId = zt, e.values = H, 
    e.where = ut, e.without = bt, e.wrap = $t, e.zip = xt, e.all = C, e.any = tt, e.collect = V, 
    e.detect = K, e.drop = yt, e.each = _r, e.foldl = W, e.foldr = X, e.head = it, e.include = N, 
    e.inject = W, e.methods = _, e.select = M, e.tail = yt, e.take = it, e.unique = dt, 
    e._iteratorTemplate = ur, Rt(e), e.prototype.chain = Gt, e.prototype.value = Jt, 
    _r([ "pop", "push", "reverse", "shift", "sort", "splice", "unshift" ], function(n) {
        var t = Zt[n];
        e.prototype[n] = function() {
            var n = this.__wrapped__;
            return t.apply(n, arguments), Ue && 0 === n.length && delete n[0], this.__chain__ && (n = new e(n), 
            n.__chain__ = !0), n;
        };
    }), _r([ "concat", "join", "slice" ], function(n) {
        var t = Zt[n];
        e.prototype[n] = function() {
            var n = this.__wrapped__, r = t.apply(n, arguments);
            return this.__chain__ && (r = new e(r), r.__chain__ = !0), r;
        };
    }), "function" == typeof define && "object" == typeof define.amd && define.amd ? (n._ = e, 
    define(function() {
        return e;
    })) : Qt ? "object" == typeof module && module && module.exports == Qt ? (module.exports = e)._ = e : Qt._ = e : n._ = e;
})(this);