/*!
 * qrcode.js 1.0.0
 * https://github.com/davidshimjs/qrcodejs
 */
var QRCode = (function () {
    function QRCode(element, options) {
        this._htOption = {
            width: 256,
            height: 256,
            typeNumber: 4,
            colorDark: "#000000",
            colorLight: "#ffffff",
            correctLevel: QRCode.CorrectLevel.H,
        };
        if (typeof options === "string") {
            options = { text: options };
        }
        if (options) {
            for (var i in options) {
                this._htOption[i] = options[i];
            }
        }
        if (typeof element === "string") {
            element = document.getElementById(element);
        }
        this._android = this._getAndroid();
        this._el = element;
        this._oQRCode = null;
        this._oDrawing = new QRCode.Drawing(this._el, this._htOption);
        this.makeCode(this._htOption.text);
    }
    QRCode.prototype._getAndroid = function () {
        var android = false;
        var sUserAgent = navigator.userAgent;
        if (/android/i.test(sUserAgent)) {
            var aMat = sUserAgent.toString().match(/android ([0-9]\.[0-9])/i);
            android = aMat && aMat[1] ? parseFloat(aMat[1]) : true;
        }
        return android;
    };
    QRCode.prototype.makeCode = function (sText) {
        this._oQRCode = new QRCodeModel(
            QRCode.CorrectLevel.L,
            this._htOption.typeNumber
        );
        this._oQRCode.addData(sText);
        this._oQRCode.make();
        this._oDrawing.draw(this._oQRCode);
    };
    QRCode.prototype.clear = function () {
        this._oDrawing.clear();
    };
    QRCode.CorrectLevel = {
        L: 1,
        M: 0,
        Q: 3,
        H: 2,
    };
    QRCode.Drawing = function (el, htOption) {
        this._el = el;
        this._htOption = htOption;
    };
    QRCode.Drawing.prototype.draw = function (oQRCode) {
        var nCount = oQRCode.getModuleCount();
        var nWidth = Math.floor(this._htOption.width / nCount);
        var nHeight = Math.floor(this._htOption.height / nCount);
        var nLeft = (this._htOption.width - nWidth * nCount) / 2;
        var nTop = (this._htOption.height - nHeight * nCount) / 2;
        this._el.innerHTML = "";
        var table = document.createElement("table");
        table.style.width = this._htOption.width + "px";
        table.style.height = this._htOption.height + "px";
        table.style.border = "0px";
        table.style.borderCollapse = "collapse";
        table.style.backgroundColor = this._htOption.colorLight;
        for (var row = 0; row < nCount; row++) {
            var tr = document.createElement("tr");
            for (var col = 0; col < nCount; col++) {
                var td = document.createElement("td");
                td.style.width = nWidth + "px";
                td.style.height = nHeight + "px";
                td.style.border = "0px";
                td.style.padding = "0px";
                td.style.margin = "0px";
                td.style.backgroundColor =
                    oQRCode.isDark(row, col) === true
                        ? this._htOption.colorDark
                        : this._htOption.colorLight;
                tr.appendChild(td);
            }
            table.appendChild(tr);
        }
        this._el.appendChild(table);
    };
    QRCode.Drawing.prototype.clear = function () {
        this._el.innerHTML = "";
    };
    return QRCode;
})();
