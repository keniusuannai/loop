var Direction;
(function (Direction) {
    Direction[Direction["Top"] = 0] = "Top";
    Direction[Direction["Right"] = 1] = "Right";
    Direction[Direction["Bottom"] = 2] = "Bottom";
    Direction[Direction["Left"] = 3] = "Left";
})(Direction || (Direction = {}));
var Square = (function () {
    function Square(position, shapeType, direction, color) {
        this.position = [0, 0];
        this.lineWidth = 10;
        this.position = position;
        this.shapeType = shapeType;
        this.direction = direction;
    }
    Square.prototype.render = function (ctx) {
        this.createShapeHandle(ctx);
    };
    Square.prototype.createShapeHandle = function (ctx) {
        ctx.lineWidth = this.lineWidth;
        ctx.strokeStyle = Square.color;
        //旋转方向
        ctx.translate(this.position[0] + 30, this.position[1] + 30);
        ctx.rotate((Math.PI / 180) * this.direction * 90);
        ctx.translate(-(this.position[0] + 30), -(this.position[1] + 30));
        switch (this.shapeType) {
            case 1:
                this.createShape1(ctx);
                break;
            case 2:
                this.createShape2(ctx);
                break;
            case 3:
                this.createShape3(ctx);
                break;
            case 4:
                this.createShape4(ctx);
                break;
        }
        ctx.setTransform(1, 0, 0, 1, 0, 0);
    };
    Square.prototype.createShape1 = function (ctx) {
        ctx.save();
        ctx.beginPath();
        ctx.arc(this.position[0] + 30, this.position[1] + 30, 20, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.fillStyle = Square.color;
        ctx.fill();
        ctx.globalCompositeOperation = "destination-out";
        ctx.beginPath();
        ctx.arc(this.position[0] + 30, this.position[1] + 30, 10, 0, Math.PI * 2, true);
        ctx.strokeStyle = "rgba(250,250,250,0)";
        ctx.fill();
        ctx.globalCompositeOperation = "source-over";
        ctx.fillRect(this.position[0] + 25, this.position[1], 10, 20);
        ctx.restore();
    };
    Square.prototype.createShape2 = function (ctx) {
        ctx.save();
        ctx.beginPath();
        ctx.arc(this.position[0] + 60, this.position[1] + 60, 30, Math.PI * 1.5, Math.PI, true);
        ctx.fillStyle = Square.color;
        ctx.stroke();
        ctx.restore();
    };
    Square.prototype.createShape3 = function (ctx) {
        ctx.save();
        ctx.lineWidth = this.lineWidth;
        ctx.strokeStyle = Square.color;
        ctx.beginPath();
        ctx.arc(this.position[0], this.position[1], 30, Math.PI * 0.5, 0, true);
        ctx.fillStyle = Square.color;
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(this.position[0] + 60, this.position[1], 30, Math.PI, Math.PI * 0.5, true);
        ctx.fillStyle = Square.color;
        ctx.stroke();
        ctx.restore();
    };
    Square.prototype.createShape4 = function (ctx) {
        ctx.save();
        ctx.lineWidth = this.lineWidth;
        ctx.strokeStyle = Square.color;
        ctx.beginPath();
        ctx.arc(this.position[0], this.position[1], 30, Math.PI * 0.5, 0, true);
        ctx.fillStyle = Square.color;
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(this.position[0] + 60, this.position[1], 30, Math.PI, Math.PI * 0.5, true);
        ctx.fillStyle = Square.color;
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(this.position[0] + 60, this.position[1] + 60, 30, Math.PI * 1.5, Math.PI, true);
        ctx.fillStyle = Square.color;
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(this.position[0], this.position[1] + 60, 30, 0, Math.PI * 1.5, true);
        ctx.fillStyle = Square.color;
        ctx.stroke();
        ctx.restore();
    };
    Square.color = '#a1bfff';
    return Square;
}());
var Loop = (function () {
    function Loop(canvas) {
        this.data = [];
        this.canvas = canvas;
        this.context = this.canvas.getContext('2d');
    }
    Loop.prototype.game = function () {
        var _this = this;
        // 数据
        for (var i = 0; i < 5; i++) {
            var dataTemp = [];
            for (var j = 0; j < 5; j++) {
                dataTemp.push([Math.ceil(Math.random() * 4), Math.ceil(Math.random() * 4)]);
            }
            this.data.push(dataTemp);
        }
        for (var i = 0; i < 5; i++) {
            for (var j = 0; j < 5; j++) {
                new Square([i * 60, j * 60], this.data[i][j][0], this.data[i][j][1]).render(this.context);
            }
        }
        //点击
        this.canvas.addEventListener('click', function (event) { return _this.clickHandle(event); });
    };
    Loop.prototype.clickHandle = function (event) {
        var x = Math.floor((event.clientX - this.canvas.getBoundingClientRect().left) / 60);
        var y = Math.floor((event.clientY - this.canvas.getBoundingClientRect().top) / 60);
        this.data[x][y][1]++;
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        for (var i = 0; i < 5; i++) {
            for (var j = 0; j < 5; j++) {
                new Square([i * 60, j * 60], this.data[i][j][0], this.data[i][j][1]).render(this.context);
            }
        }
    };
    Loop.prototype.checkResult = function () {
        for (var i = 0; i < 5; i++) {
            for (var j = 0; j < 5; j++) {
                this.data;
            }
        }
    };
    return Loop;
}());
new Loop(document.getElementById('canvas')).game();