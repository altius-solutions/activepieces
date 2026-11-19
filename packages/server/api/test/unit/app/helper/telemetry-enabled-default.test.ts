import { afterEach, describe, expect, it } from 'vitest'
import { system } from '../../../../src/app/helper/system/system'
import { AppSystemProp } from '../../../../src/app/helper/system/system-props'

const ENV_KEY = `AP_${AppSystemProp.TELEMETRY_ENABLED}`

describe('AP_TELEMETRY_ENABLED', () => {
    const previous = process.env[ENV_KEY]

    afterEach(() => {
        if (previous === undefined) {
            delete process.env[ENV_KEY]
            return
        }
        process.env[ENV_KEY] = previous
    })

    it('is disabled when the variable is unset', () => {
        delete process.env[ENV_KEY]

        expect(system.getBoolean(AppSystemProp.TELEMETRY_ENABLED)).toBe(false)
    })

    it('stays disabled for any value other than the string true', () => {
        process.env[ENV_KEY] = 'false'

        expect(system.getBoolean(AppSystemProp.TELEMETRY_ENABLED)).toBe(false)
    })

    it('turns on only when set to true', () => {
        process.env[ENV_KEY] = 'true'

        expect(system.getBoolean(AppSystemProp.TELEMETRY_ENABLED)).toBe(true)
    })
})
