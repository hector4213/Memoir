import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'

import Button from './Button'
import {palindrome} from './Button'


describe('COMPONENT TESTING', () => {
    test('renders button', () => {
        render(<Button />)
        expect(screen.getByRole('button')).toBeInTheDocument();
    })

    test('renders button checks for text', () => {
        render(<Button />)
        expect(screen.getByText('hello')).toBeInTheDocument();
    })

    test('renders button w/ props', () => {
        const args = {
            primary: true,
            label: 'test',
            backgroundColor: '#000'
        }

        render(<Button {...args} />)
        expect(screen.getByRole('button')).toHaveTextContent('test')
    })
})


describe('FUNCTION TESTING', () => {

    test('palindrome of a', () => {
        const result = palindrome('a')
        expect(result).toBe('a')
    })

    test('palindrome of react', () => {
        const result = palindrome('react')
        expect(result).toBe('tcaer')
    })

})