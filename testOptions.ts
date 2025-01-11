import {test as base} from '@playwright/test'

export type TestOptions = {
   emailVerificationQaUrl: string     
}

export const test = base.extend<TestOptions>({
    emailVerificationQaUrl: ['', {option: true}]
})