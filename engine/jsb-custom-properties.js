// Copyright (c) 2017-2018 Xiamen Yaji Software Co., Ltd.
(function(){
    if (!cc.CustomProperties) return;

    const enums = cc.CustomProperties.enums;

    class NativeCustomProperties {
        constructor() {
            this._nativeObj = new renderer.CustomProperties();
        }

        setProperty (name, value, type, directly) {
            if (directly || ArrayBuffer.isView(value)) {
                value = value;
            }
            else if (type === enums.PARAM_TEXTURE_2D) {
                value = new Uint32Array([value.getImpl().getHandle()]);
            }
            else {
                if (!Array.isArray(value)) {
                    value = [value];
                }
                
                value = new Float32Array(value);
            }
            
            this._nativeObj.setProperty(name, type, value);
        }

        define (name, value) {
            this._nativeObj.define(name, value);
        }
    }

    cc.CustomProperties = NativeCustomProperties;
})();   