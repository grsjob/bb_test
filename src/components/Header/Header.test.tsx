import { act, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Header from "./Header";

it('should be render Header', async  () => {
    await act(async ()=>{
        await render(<Header />)
    })
    expect(screen.getByText('Список эпизодов Breaking Bad')).toBeInTheDocument()
});