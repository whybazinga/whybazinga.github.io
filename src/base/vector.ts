export class Vector {
    x: number;
    y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    static zero(): Vector {
        return new Vector(0, 0);
    }

    static up(): Vector {
        return new Vector(0, 1);
    }
    static down(): Vector {
        return new Vector(0, -1);
    }
    static right(): Vector { 
        return new Vector(1, 0);
    }
    static left(): Vector { 
        return new Vector(-1, 0);
    }

    copy(): Vector {
        return new Vector(this.x, this.y);
    }

    distanceTo(other: Vector): number {
        return Math.sqrt((this.x - other.x) * (this.x - other.x) + (this.y - other.y) * (this.y - other.y));
    }

    length(): number {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    normalize(): Vector {
        return this.divide(this.length());
    }

    add(other: Vector): Vector {
        this.x += other.x;
        this.y += other.y;

        return this;
    }

    sub(other: Vector): Vector {
        this.x -= other.x;
        this.y -= other.y;

        return this;
    }

    multiply(value: number): Vector {
        this.x *= value;
        this.y *= value;

        return this;
    }

    divide(value: number): Vector {
        this.x /= value;
        this.y /= value;

        return this;
    }

    invert(): Vector {
        return this.multiply(-1);
    }

    dot(other: Vector): number {
        return this.x * other.x + this.y * other.y;
    }
}