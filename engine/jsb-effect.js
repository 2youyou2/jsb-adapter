// Copyright (c) 2017-2018 Xiamen Yaji Software Co., Ltd.
const gfx = window.gfx;

let Effect = cc.Effect;

class NativeEffect extends Effect {
    constructor(name, techniques, properties = {}, defines = {}, dependencies = [], buffer) {
        super(name, techniques, properties, defines, dependencies, buffer);
    
        this._nativeObj = new renderer.EffectNative();
    }

    define(name, value) {
        this._nativeObj.define(name, value);
    }

    updateHash(hash) {
        this._nativeObj.updateHash(hash);
    }
    
    getTechnique(stage) {
    }

    clone () {
        let effect = super.clone();
        effect._nativeObj.copy(this._nativeObj, effect._buffer);
        return effect;
    }
}

let _parseEffect = cc.Effect.parseEffect;
cc.Effect.parseEffect = function (asset) {
    let effect = _parseEffect(asset);

    let defines = effect._defines;
    let definesArr = [];
    for (let key in defines) {
        definesArr.push({ name: key, value: defines[key] });
    }
    effect._nativeObj.init(effect._techniques, effect._properties, definesArr, effect._buffer);

    return effect;
}

cc.Effect = NativeEffect;
