
// Motor channel.
enum MotorChannel {
    M1 = 0,
    M2 = 1,
    
    //% block="all"
    All = 1000,
};

// Motor direction.
enum MotorDirection {
    //% block="forward"
    Forward = 0,

    //% block="backward"
    Backward = 1
};



namespace makerDrive {

    /**
     * Brake the motor
     * @param motor Motor channel. eg: Motor.M1, Motor.M2
     */
    //% group="DC Motors"
    //% weight=20
    //% blockGap=8
    //% blockId=rekabit_brake_motor
    //% block="brake motor %motor"
    export function brakeMotor(motor: MotorChannel): void {
        switch (motor) {
            case MotorChannel.M1:
                makerDrive.i2cWrite(REG_ADD_M1A, 0);
                makerDrive.i2cWrite(REG_ADD_M1B, 0);
                break;

            case MotorChannel.M2:
                makerDrive.i2cWrite(REG_ADD_M2A, 0);
                makerDrive.i2cWrite(REG_ADD_M2B, 0);
                break;

            case MotorChannel.All:
                makerDrive.i2cWrite(REG_ADD_M1A, 0);
                makerDrive.i2cWrite(REG_ADD_M1B, 0);
                makerDrive.i2cWrite(REG_ADD_M2A, 0);
                makerDrive.i2cWrite(REG_ADD_M2B, 0);
                break;
        }
    }


    /**
     * Run the motor forward or backward (Speed = 0-255).
     * @param motor Motor channel.
     * @param direction Motor direction.
     * @param speed Motor speed (0-255). eg: 128
     */
    //% group="DC Motors"
    //% weight=19
    //% blockGap=40
    //% blockId=rekabit_run_motor
    //% block="run motor %motor %direction at speed %speed"
    //% speed.min=0 speed.max=255
    export function runMotor(motor: MotorChannel, direction: MotorDirection, speed: number): void {
        speed = makerDrive.limit(speed, 0, 255);
        switch (motor) {
            case MotorChannel.M1:
                if (direction == MotorDirection.Forward) {
                    makerDrive.i2cWrite(REG_ADD_M1A, speed);
                    makerDrive.i2cWrite(REG_ADD_M1B, 0);
                }
                else {
                    makerDrive.i2cWrite(REG_ADD_M1A, 0);
                    makerDrive.i2cWrite(REG_ADD_M1B, speed);
                }
                break;

            case MotorChannel.M2:
                if (direction == MotorDirection.Forward) {
                    makerDrive.i2cWrite(REG_ADD_M2A, speed);
                    makerDrive.i2cWrite(REG_ADD_M2B, 0);
                }
                else {
                    makerDrive.i2cWrite(REG_ADD_M2A, 0);
                    makerDrive.i2cWrite(REG_ADD_M2B, speed);
                }
                break;

            case MotorChannel.All:
                if (direction == MotorDirection.Forward) {
                    makerDrive.i2cWrite(REG_ADD_M1A, speed);
                    makerDrive.i2cWrite(REG_ADD_M1B, 0);
                    makerDrive.i2cWrite(REG_ADD_M2A, speed);
                    makerDrive.i2cWrite(REG_ADD_M2B, 0);
                }
                else {
                    makerDrive.i2cWrite(REG_ADD_M1A, 0);
                    makerDrive.i2cWrite(REG_ADD_M1B, speed);
                    makerDrive.i2cWrite(REG_ADD_M2A, 0);
                    makerDrive.i2cWrite(REG_ADD_M2B, speed);
                }
                break;
        }
    }
}
