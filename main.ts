

// I2C slave address for PIC16F1827.
const I2C_ADDRESS = 0x08;

// Register address.
const REG_ADD_M1A = 0;
const REG_ADD_M1B = 1;
const REG_ADD_M2A = 8;
const REG_ADD_M2B = 9;



/**
 * Blocks for REKA:BIT servos and motors driver.
 */
//% weight=10 color=#ff8000 icon="\uf085" block="REKA:BIT"
//% groups=['DC Motors', 'Servos', 'RGB LED']
namespace makerDrive {
    // Brake the motors.
    brakeMotor(MotorChannel.M1);
    brakeMotor(MotorChannel.M2);

    /**
     * Limit the range of a number.
     * @param value The number we want to limit.
     * @param min Minimum value of the number.
     * @param max Maximum value of the number.
     */
    //% blockHidden=true
    //% blockId=rekabit_limit
    export function limit(value: number, min: number, max: number): number {
        if (value < min) {
            value = min;
        }
        else if (value > max) {
            value = max;
        }
        return value;
    }



    /**
     * I2C read from the register of PIC16F1827.
     * @param register Register address.
     */
    //% blockHidden=true
    //% blockId=rekabit_i2c_read
    export function i2cRead(register: number): number {
        let value = 0;
        pins.i2cWriteNumber(I2C_ADDRESS, register, NumberFormat.UInt8LE, true);
        value = pins.i2cReadNumber(I2C_ADDRESS, NumberFormat.UInt8LE);
        return value;
    }



    /**
     * I2C write to the register of PIC16F1827.
     * @param register Register address.
     * @param data Data to write.
     */
    //% blockHidden=true
    //% blockId=rekabit_i2c_write
    export function i2cWrite(register: number, data: number): void {
        let buffer = pins.createBuffer(2);
        buffer[0] = register;
        buffer[1] = data;
        pins.i2cWriteBuffer(I2C_ADDRESS, buffer);
    }

}

