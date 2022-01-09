(() => {
  "use strict";
  const t = {};
  function e(t) {
    return t.filter(function (t, e, r) {
      return r.indexOf(t) === e;
    });
  }
  t.watcher = new (class {
    constructor(t) {
      (this.config = Object.assign({ logging: !0 }, t)),
        this.observer,
        !document.documentElement.classList.contains("watcher") &&
          this.scrollWatcherRun();
    }
    scrollWatcherUpdate() {
      this.scrollWatcherRun();
    }
    scrollWatcherRun() {
      document.documentElement.classList.add("watcher"),
        this.scrollWatcherConstructor(
          document.querySelectorAll("[data-watch]")
        );
    }
    scrollWatcherConstructor(t) {
      if (t.length) {
        this.scrollWatcherLogging(
          `Проснулся, слежу за объектами (${t.length})...`
        ),
          e(
            Array.from(t).map(function (t) {
              return `${
                t.dataset.watchRoot ? t.dataset.watchRoot : null
              }|${t.dataset.watchMargin ? t.dataset.watchMargin : "0px"}|${t.dataset.watchThreshold ? t.dataset.watchThreshold : 0}`;
            })
          ).forEach((e) => {
            let r = e.split("|"),
              o = { root: r[0], margin: r[1], threshold: r[2] },
              n = Array.from(t).filter(function (t) {
                let e = t.dataset.watchRoot ? t.dataset.watchRoot : null,
                  r = t.dataset.watchMargin ? t.dataset.watchMargin : "0px",
                  n = t.dataset.watchThreshold ? t.dataset.watchThreshold : 0;
                if (
                  String(e) === o.root &&
                  String(r) === o.margin &&
                  String(n) === o.threshold
                )
                  return t;
              }),
              c = this.getScrollWatcherConfig(o);
            this.scrollWatcherInit(n, c);
          });
      } else
        this.scrollWatcherLogging("Сплю, нет объектов для слежения. ZzzZZzz");
    }
    getScrollWatcherConfig(t) {
      let e = {};
      if (
        (document.querySelector(t.root)
          ? (e.root = document.querySelector(t.root))
          : "null" !== t.root &&
            this.scrollWatcherLogging(
              `Эмм... родительского объекта ${t.root} нет на странице`
            ),
        (e.rootMargin = t.margin),
        !(t.margin.indexOf("px") < 0 && t.margin.indexOf("%") < 0))
      ) {
        if ("prx" === t.threshold) {
          t.threshold = [];
          for (let e = 0; e <= 1; e += 0.005) t.threshold.push(e);
        } else t.threshold = t.threshold.split(",");
        return (e.threshold = t.threshold), e;
      }
      this.scrollWatcherLogging(
        "Ой ой, настройку data-watch-margin нужно задавать в PX или %"
      );
    }
    scrollWatcherCreate(t) {
      this.observer = new IntersectionObserver((t, e) => {
        t.forEach((t) => {
          this.scrollWatcherCallback(t, e);
        });
      }, t);
    }
    scrollWatcherInit(t, e) {
      this.scrollWatcherCreate(e), t.forEach((t) => this.observer.observe(t));
    }
    scrollWatcherIntersecting(t, e) {
      t.isIntersecting
        ? (!e.classList.contains("_watcher-view") &&
            e.classList.add("_watcher-view"),
          this.scrollWatcherLogging(
            `Я вижу ${e.classList}, добавил класс _watcher-view`
          ))
        : (e.classList.contains("_watcher-view") &&
            e.classList.remove("_watcher-view"),
          this.scrollWatcherLogging(
            `Я не вижу ${e.classList}, убрал класс _watcher-view`
          ));
    }
    scrollWatcherOff(t, e) {
      e.unobserve(t),
        this.scrollWatcherLogging(`Я перестал следить за ${t.classList}`);
    }
    scrollWatcherLogging(t) {
      this.config.logging &&
        (function (t) {
          setTimeout(() => {
            window.FLS && console.log(t);
          }, 0);
        })(`[Наблюдатель]: ${t}`);
    }
    scrollWatcherCallback(t, e) {
      const r = t.target;
      this.scrollWatcherIntersecting(t, r),
        r.hasAttribute("data-watch-once") &&
          t.isIntersecting &&
          this.scrollWatcherOff(r, e),
        document.dispatchEvent(
          new CustomEvent("watcherCallback", { detail: { entry: t } })
        );
    }
  })({});
  let r = !1;
  setTimeout(() => {
    if (r) {
      let t = new Event("windowScroll");
      window.addEventListener("scroll", function (e) {
        document.dispatchEvent(t);
      });
    }
  }, 0),
    document.addEventListener("DOMContentLoaded", function () {
      const t = document.forms.mainForm.searchInput,
        e = t.placeholder;
      t.addEventListener("focus", function (e) {
        t.placeholder = "";
      }),
        t.addEventListener("blur", function (r) {
          t.placeholder = e;
        }),
        setInterval(() => {
          setTimeout(() => {
            t.focus();
          }, 3e3),
            setTimeout(() => {
              t.blur();
            }, 6e3);
        }, 7e3);
    }),
    document.addEventListener("DOMContentLoaded", function (t) {
      const e = document.querySelector(".header__burger"),
        r = document.querySelector(".header__navigation");
      document.querySelector("body");
      function o() {
        e.classList.remove("active"), r.classList.remove("active");
      }
      e.addEventListener("click", function (t) {
        t.target.closest(".header__burger") &&
          (e.classList.toggle("active"), r.classList.toggle("active"));
      }),
        document.addEventListener("click", function (t) {
          t.target.closest(".header__burger") || o();
        }),
        document.addEventListener("keyup", function (t) {
          "Escape" === t.code && o();
        });
    }),
    document.addEventListener("DOMContentLoaded", function () {
      function t(t) {
        t.parentElement.classList.add("_error"), t.classList.add("_error");
      }
      function e(t) {
        t.parentElement.classList.remove("_error"),
          t.classList.remove("_error");
      }
      function r(t) {
        return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(t.value);
      }
      mainForm.addEventListener("submit", async function (o) {
        o.preventDefault(),
          0 ===
          (function (o) {
            let n = 0,
              c = document.querySelectorAll("._req");
            for (let o = 0; o < c.length; o++) {
              const s = c[o];
              e(s),
                s.classList.contains("_email")
                  ? r(s) && (t(s), n++)
                  : "" === s.value && (t(s), n++);
            }
            return n;
          })(mainForm)
            ? mainForm.reset()
            : (alert("Заполните обязательные поля"), mainFormInput.focus());
      });
    }),
    (window.FLS = !0),
    (function (t) {
      let e = new Image();
      (e.onload = e.onerror =
        function () {
          t(2 == e.height);
        }),
        (e.src =
          "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA");
    })(function (t) {
      let e = !0 === t ? "webp" : "no-webp";
      document.documentElement.classList.add(e);
    });
})();
