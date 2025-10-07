(function () {
    var _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function (command, args) {
        _Game_Interpreter_pluginCommand.call(this, command, args);
        if (command === 'CMstate') {
            $gameScreen.showPicture(69, 'hyp/Hpara3', 0, 0, 0, 100, 100, 255, 0);
            SceneManager.goto(Scene_CustomStatus);
        }
        if(command === 'CMstate_clear')
        {
            SceneManager.goto(Scene_Map)
            $gameScreen.erasePicture(69)
        }

    }

})();
// 定义图像名称数组
var imageNames = ['hyp/hst_st_parts1_3', 'hyp/hst_st_parts2_3', 'hyp/hst_st_parts3_3', 'hyp/hst_st_parts4_3'];
var textsex = ["口交", "胸部", "小穴", "后庭"]
var textsex2 = ["<校规是绝对的>", "<忘记校园的事情>", "<裸体上学很正常>", "<侍奉同学很正常>", "????", "????", "????", "????", "????", "????", "????", "????"]
var windowConfigurations = [{ x: 0, y: 0, width: 380, height: 200 }, { x: 0, y: 200, width: 380, height: 250 }, { x: 0, y: 450, width: 380, height: 320 },
{ x: 644, y: 0, width: 380, height: 194 }, { x: 644, y: 192, width: 380, height: 194 }, { x: 644, y: 384, width: 380, height: 194 }, { x: 644, y: 575, width: 380, height: 194 }];


// 定义一个新的Scene_Custom，继承自Scene_Base
function Scene_CustomStatus() {
    this.initialize.apply(this, arguments);
}

Scene_CustomStatus.prototype = Object.create(Scene_MenuBase.prototype);
Scene_CustomStatus.prototype.constructor = Scene_CustomStatus;

Scene_CustomStatus.prototype.initialize = function () {
    Scene_MenuBase.prototype.initialize.call(this);
};

Scene_CustomStatus.prototype.create = function () {
    Scene_MenuBase.prototype.create.call(this);
    for (var i = 0; i < windowConfigurations.length; i++) {
        var config = windowConfigurations[i];
        this._statusWindow = new MyCustomWindow(config.x, config.y, config.width, config.height)
        this._statusWindow.z = 100;
        if (i <= 2) {
            if (i == 0) {
                var textContext = this._statusWindow.contents;
                textContext.textColor = '#e3c56c'; // 设置字体颜色
                textContext.fontSize = 40; // 设置字体大小
                var text = '响木 天音';
                this._statusWindow.drawText(text, 0, 0, config.width, 'left');
                textContext.textColor = '#d677bd'; // 设置字体颜色
                textContext.fontSize = 30; // 设置字体大小
                textContext.fontItalic = true; // 斜体
                text = "LV5/5 [催眠奴隶]"
                this._statusWindow.drawText(text, 0, config.height / 2 - 40, config.width, 'left');
                text = "催眠深度：999"
                this._statusWindow.drawText(text, 0, config.height / 2 + 20, config.width, 'left');
            }
            else if (i == 1) {
                var textContext = this._statusWindow.contents;
                textContext.textColor = '#e3c56c'; // 设置字体颜色
                textContext.fontSize = 20; // 设置字体大小
                text = "▶催眠指令"
                this._statusWindow.drawText(text, 0, 0, config.width, 'left');
                var j = 0;
                while (j <= textsex2.length) {
                    var textContext = this._statusWindow.contents;
                    textContext.textColor = '#d677bd'; // 设置字体颜色
                    textContext.fontSize = 15; // 设置字体大小
                    textContext.fontItalic = true;
                    var text = textsex2[j - 1];
                    if (j <= 7) {
                        this._statusWindow.drawText(text, 0, 0 + j * 25, config.width, 'left');
                    }
                    else {
                        this._statusWindow.drawText(text, 200, 0 + (j - 7) * 25, config.width, 'left');
                    }
                    j++;
                }
            }
        }
        else {
            var textContext = this._statusWindow.contents;
            textContext.textColor = '#e3c56c'; // 设置字体颜色
            textContext.fontSize = 20; // 设置字体大小
            var text = textsex[i - 3] + '熟练程度';
            this._statusWindow.drawText(text, 0, 0, config.width, 'left');
            textContext.textColor = '#ebe0e8';
            var text2 = textsex[i - 3] + '次数：' + i;
            this._statusWindow.drawText(text2, 0, config.height / 2 - 30, config.width - 80, 'center');
            textContext.textColor = '#d85bb7'; // 设置字体颜色
            var text3 = textsex[i - 3] + '好舒服啊啊啊啊啊啊';
            this._statusWindow.drawText(text3, 0, config.height / 2 + 35, config.width + 20, 'left');
        }
        this.addWindow(this._statusWindow);
    }
    // 循环创建和设置图像精灵
    for (var i = 0; i < imageNames.length; i++) {
        var imageName = imageNames[i];
        // 创建图像精灵
        this._imageSprite = new Sprite(ImageManager.loadPicture(imageName));
        // 设置图像精灵的属性
        this._imageSprite.x = 660;
        this._imageSprite.y = 60 + i * 195; // 根据索引调整y坐标
        this._imageSprite.scale.x = 1.5;
        this._imageSprite.scale.y = 1.5;
        this._imageSprite.z = 199;

        // 将图像精灵添加到场景中
        this.addChild(this._imageSprite);
    }
};

Scene_CustomStatus.prototype.start = function () {
    Scene_MenuBase.prototype.start.call(this);
};

function MyCustomWindow() {
    this.initialize.apply(this, arguments);
}

MyCustomWindow.prototype = Object.create(Window_Base.prototype);
MyCustomWindow.prototype.constructor = MyCustomWindow;

MyCustomWindow.prototype.initialize = function (x, y, width, height) {
    Window_Base.prototype.initialize.call(this, x, y, width, height);
    this.loadWindowskin();
};
// 在新窗口类的初始化函数中加载自定义的背景图片
MyCustomWindow.prototype.loadWindowskin = function () {
    this.windowskin = ImageManager.loadSystem('Window3');
};