'use strict';

//#region Polyglot

//     (c) 2012 Airbnb, Inc.
//
//     polyglot.js may be freely distributed under the terms of the BSD
//     license. For all licensing information, details, and documention:
//     http://airbnb.github.com/polyglot.js
//
//
// Polyglot.js is an I18n helper library written in JavaScript, made to
// work both in the browser and in Node. It provides a simple solution for
// interpolation and pluralization, based off of Airbnb's
// experience adding I18n functionality to its Backbone.js and Node apps.
//
// Polylglot is agnostic to your translation backend. It doesn't perform any
// translation; it simply gives you a way to manage translated phrases from
// your client- or server-side JavaScript application.
//

// ### Polyglot class constructor
function Polyglot(options) {
    options = options || {};
    this.phrases = {};
    this.extend(options.phrases || {});
    this.currentLocale = options.locale || 'en';
    this.allowMissing = !!options.allowMissing;
    this.warn = options.warn || warn;
}

// ### Version
Polyglot.VERSION = '0.4.3';

// ### polyglot.locale([locale])
//
// Get or set locale. Internally, Polyglot only uses locale for pluralization.
Polyglot.prototype.locale = function (newLocale) {
    if (newLocale) this.currentLocale = newLocale;
    return this.currentLocale;
};

// ### polyglot.extend(phrases)
//
// Use `extend` to tell Polyglot how to translate a given key.
//
//     polyglot.extend({
//       "hello": "Hello",
//       "hello_name": "Hello, %{name}"
//     });
//
// The key can be any string.  Feel free to call `extend` multiple times;
// it will override any phrases with the same key, but leave existing phrases
// untouched.
//
// It is also possible to pass nested phrase objects, which get flattened
// into an object with the nested keys concatenated using dot notation.
//
//     polyglot.extend({
//       "nav": {
//         "hello": "Hello",
//         "hello_name": "Hello, %{name}",
//         "sidebar": {
//           "welcome": "Welcome"
//         }
//       }
//     });
//
//     console.log(polyglot.phrases);
//     // {
//     //   'nav.hello': 'Hello',
//     //   'nav.hello_name': 'Hello, %{name}',
//     //   'nav.sidebar.welcome': 'Welcome'
//     // }
//
// `extend` accepts an optional second argument, `prefix`, which can be used
// to prefix every key in the phrases object with some string, using dot
// notation.
//
//     polyglot.extend({
//       "hello": "Hello",
//       "hello_name": "Hello, %{name}"
//     }, "nav");
//
//     console.log(polyglot.phrases);
//     // {
//     //   'nav.hello': 'Hello',
//     //   'nav.hello_name': 'Hello, %{name}'
//     // }
//
// This feature is used internally to support nested phrase objects.
Polyglot.prototype.extend = function (morePhrases, prefix) {
    let phrase;

    for (let key in morePhrases) {
        if (Object.hasOwnProperty.call(morePhrases, key)) {
            phrase = morePhrases[key];
            if (prefix) key = prefix + '.' + key;
            if (typeof phrase === 'object') {
                this.extend(phrase, key);
            } else {
                this.phrases[key] = phrase;
            }
        }
    }
};

// ### polyglot.clear()
//
// Clears all phrases. Useful for special cases, such as freeing
// up memory if you have lots of phrases but no longer need to
// perform any translation. Also used internally by `replace`.
Polyglot.prototype.clear = function () {
    this.phrases = {};
};

// ### polyglot.replace(phrases)
//
// Completely replace the existing phrases with a new set of phrases.
// Normally, just use `extend` to add more phrases, but under certain
// circumstances, you may want to make sure no old phrases are lying around.
Polyglot.prototype.replace = function (newPhrases) {
    this.clear();
    this.extend(newPhrases);
};


// ### polyglot.t(key, options)
//
// The most-used method. Provide a key, and `t` will return the
// phrase.
//
//     polyglot.t("hello");
//     => "Hello"
//
// The phrase value is provided first by a call to `polyglot.extend()` or
// `polyglot.replace()`.
//
// Pass in an object as the second argument to perform interpolation.
//
//     polyglot.t("hello_name", {name: "Spike"});
//     => "Hello, Spike"
//
// If you like, you can provide a default value in case the phrase is missing.
// Use the special option key "_" to specify a default.
//
//     polyglot.t("i_like_to_write_in_language", {
//       _: "I like to write in %{language}.",
//       language: "JavaScript"
//     });
//     => "I like to write in JavaScript."
//
Polyglot.prototype.t = function (key, ...args) {
    let phrase, result, options;
    if (args.length == 0) {
        options = {};
    } else if (args.length == 1 && typeof args[0] == "object") {
        options = args[0];
    } else {
        options = {};
        for (let i = 0; i < args.length; i++) {
            if (typeof args[i] == "string" || typeof args[i] == "number") {
                options[i + 1] = args[i];
            }
        }
    }
    // allow number as a pluralization shortcut
    // if (typeof options === 'number') {
    //     options = { smart_count: options };
    // }
    if (typeof this.phrases[key] === 'string') {
        phrase = this.phrases[key];
    } else if (typeof options._ === 'string') {
        phrase = options._;
    } else if (this.allowMissing) {
        phrase = key;
    } else {
        this.warn('Missing translation for key: "' + key + '"');
        result = key;
    }
    if (typeof phrase === 'string') {
        options = clone(options);
        result = choosePluralForm(phrase, this.currentLocale, options.smart_count);
        result = interpolate(result, options);
    }
    return result;
};


// ### polyglot.has(key)
//
// Check if polyglot has a translation for given key
Polyglot.prototype.has = function (key) {
    return key in this.phrases;
};


// #### Pluralization methods
// The string that separates the different phrase possibilities.
let delimeter = '||||';

// Mapping from pluralization group plural logic.
let pluralTypes = {
    chinese: function (n) { return 0; },
    german: function (n) { return n !== 1 ? 1 : 0; },
    french: function (n) { return n > 1 ? 1 : 0; },
    russian: function (n) { return n % 10 === 1 && n % 100 !== 11 ? 0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2; },
    czech: function (n) { return (n === 1) ? 0 : (n >= 2 && n <= 4) ? 1 : 2; },
    polish: function (n) { return (n === 1 ? 0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2); },
    icelandic: function (n) { return (n % 10 !== 1 || n % 100 === 11) ? 1 : 0; }
};

// Mapping from pluralization group to individual locales.
let pluralTypeToLanguages = {
    chinese: ['fa', 'id', 'ja', 'ko', 'lo', 'ms', 'th', 'tr', 'zh'],
    german: ['da', 'de', 'en', 'es', 'fi', 'el', 'he', 'hu', 'it', 'nl', 'no', 'pt', 'sv'],
    french: ['fr', 'tl', 'pt-br'],
    russian: ['hr', 'ru'],
    czech: ['cs'],
    polish: ['pl'],
    icelandic: ['is']
};

function langToTypeMap(mapping) {
    let type, langs, l, ret = {};
    for (type in mapping) {
        if (Object.hasOwnProperty.call(mapping, type)) {
            langs = mapping[type];
            for (l in langs) {
                ret[langs[l]] = type;
            }
        }
    }
    return ret;
}

// Trim a string.
function trim(str) {
    let trimRe = /^\s+|\s+$/g;
    return str.replace(trimRe, '');
}

// Based on a phrase text that contains `n` plural forms separated
// by `delimeter`, a `locale`, and a `count`, choose the correct
// plural form, or none if `count` is `null`.
function choosePluralForm(text, locale, count) {
    let ret, texts, chosenText;
    if (count != null && text) {
        texts = text.split(delimeter);
        chosenText = texts[pluralTypeIndex(locale, count)] || texts[0];
        ret = trim(chosenText);
    } else {
        ret = text;
    }
    return ret;
}

function pluralTypeName(locale) {
    let langToPluralType = langToTypeMap(pluralTypeToLanguages);
    return langToPluralType[locale] || langToPluralType.en;
}

function pluralTypeIndex(locale, count) {
    return pluralTypes[pluralTypeName(locale)](count);
}

// ### interpolate
//
// Does the dirty work. Creates a `RegExp` object for each
// interpolation placeholder.
function interpolate(phrase, options) {
    for (let arg in options) {
        if (arg !== '_' && Object.hasOwnProperty.call(options, arg)) {
            // We create a new `RegExp` each time instead of using a more-efficient
            // string replace so that the same argument can be replaced multiple times
            // in the same phrase.
            phrase = phrase.replace(new RegExp('\\{' + arg + '\\}', 'g'), options[arg]);
        }
    }
    return phrase;
}

// ### warn
//
// Provides a warning in the console if a phrase key is missing.
function warn(message) {
    cc.warn('WARNING: ' + message);
}

// ### clone
//
// Clone an object.
function clone(source) {
    let ret = {};
    for (let prop in source) {
        ret[prop] = source[prop];
    }
    return ret;
}
//#endregion

/** i18n 管理器 */
function I18nManager() {
    /** 是否已经初始化完成 */
    this.inited = false;
    /** 当前的语言 */
    this.curLang = "";
    /** 当前文本转译器 */
    this._polyInst = new Polyglot({ phrases: {}, allowMissing: true });
    /** 本地化加载句柄 */
    this._localesHandler = null;
    /** 本地化字库加载句柄 */
    this._localesTTFHandler = null;
    /** 字库uuid字典：由于目前的机制，需要记录字库的uuid，方便用来替换 */
    this._ttfUuids = null;
    /** 本地化字体库*/
    this.ttf = null;
}

I18nManager.prototype.extendText = function (data, prefix) {
    this._polyInst.extend(data, prefix);
}

I18nManager.prototype.replaceText = function (data) {
    this._polyInst.replace(data);
}

I18nManager.prototype.clearText = function () {
    this._polyInst.clear();
}

I18nManager.prototype.t = function (key, ...args) {
    return this._polyInst.t(key, ...args);
}


/** 初始化文本加载句柄 */
I18nManager.prototype.initLocalesHandler = function (handler) {
    this._localesHandler = handler;
}

/** 字体加载句柄 */
I18nManager.prototype.initLocalesTTFHandler = function (handler, ttfs) {
    this._localesTTFHandler = handler;
    this._ttfUuids = ttfs;
}

/** 初始化多语言配置 */
I18nManager.prototype.init = function (lang, cb) {
    if (lang === this.curLang) {
        return;
    }
    if (!lang) {
        lang = this.curLang || "zh";
    }
    this.curLang = lang;
    if (!this._localesHandler) {
        this._localesHandler = this.defaultLocalesHandler;
    }
    let textLoad = !this._localesHandler, ttfLoad = !this._localesTTFHandler;
    if (textLoad && ttfLoad) {
        this.inited = true;
        return cb && cb();
    }
    this._localesHandler && this._localesHandler(lang, (phrases, prefix) => {
        this.extendText(phrases, prefix);
        textLoad = true;
        this.inited = textLoad && ttfLoad;
        this.inited && cb();
    });
    this._localesTTFHandler && this._localesTTFHandler(lang, (font) => {
        this.ttf = font;
        if (this.ttf) {
            // fixLabel onLoad
            let oldLoad = cc.Label.prototype.onLoad;
            cc.Label.prototype.onLoad = function () {
                oldLoad.call(this);
                this.cacheMode = cc.Label.CacheMode.CHAR;
                if (!this.font && this.useSystemFont) {
                    this.font = i18n.ttf;
                } else {
                    let oldUuid = this.font._uuid;
                    if (i18n._ttfUuids[oldUuid] && oldUuid != i18n.ttf._uuid) {
                        this.font = i18n.ttf;
                    }
                }
            }

            let richOldLoad = cc.RichText.prototype.onLoad;
            cc.RichText.prototype.onLoad = function () {
                richOldLoad && richOldLoad.call(this);
                this.cacheMode = cc.Label.CacheMode.CHAR;
                if (!this.font && this.useSystemFont) {
                    this.font = i18n.ttf;

                } else {
                    let oldUuid = this.font._uuid;
                    if (i18n._ttfUuids[oldUuid] && oldUuid != i18n.ttf._uuid) {
                        this.font = i18n.ttf;
                    }
                }
            }

        }
        ttfLoad = true;
        this.inited = textLoad && ttfLoad;
        this.inited && cb();
    })
}

I18nManager.prototype.fullPath = function (subPath) {
    return 'i18n/' + this.curLang + '/' + subPath;

}

I18nManager.prototype.updateSceneRenderers = CC_EDITOR ? function () {
    let scence = cc.director.getScene();
    if (!scence) return;
    let rootNodes = scence.children;
    if (!rootNodes) return;
    let allLocalizedLabels = [];
    let allLocalizedSprites = [];
    let allLocalizedRitchTexts = [];
    for (let i = 0; i < rootNodes.length; ++i) {
        let labels = rootNodes[i].getComponentsInChildren('LocalizedLabel');
        Array.prototype.push.apply(allLocalizedLabels, labels);
        let sprites = rootNodes[i].getComponentsInChildren('LocalizedSprite');
        Array.prototype.push.apply(allLocalizedSprites, sprites);
        let richText = rootNodes[i].getComponentsInChildren("LocalizedRichText");
        Array.prototype.push.apply(allLocalizedRitchTexts, richText);
    }
    for (let i = 0; i < allLocalizedLabels.length; ++i) {
        let label = allLocalizedLabels[i];
        if (!label.node.active) continue;
        label.fetchRender();
    }
    for (let i = 0; i < allLocalizedSprites.length; ++i) {
        let sprite = allLocalizedSprites[i];
        if (!sprite.node.active) continue;
        sprite.fetchRender();
    }
    for (let i = 0; i < allLocalizedRitchTexts.length; ++i) {
        let richText = allLocalizedRitchTexts[i];
        if (!richText.node.active) continue;
        richText.fetchRender();
    }
} : null;

let i18nMgr = new I18nManager();
window.i18n = i18nMgr;