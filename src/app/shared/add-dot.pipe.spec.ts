import { AddDot } from "./add-dot.pipe";

describe('AddDot', () => {
  it('create an instance', () => {
    const pipe = new AddDot();
    expect(pipe).toBeTruthy();
  });
});
