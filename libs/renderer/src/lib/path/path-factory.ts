import { Path } from './path';
import { RectanglePath } from './rectangle-path';
import { SvgPath } from './svg-path';

export function pathFactory(name: string, delegate: Element): Path {
  if (name === 'svg') {
    return new SvgPath(delegate);
  }

  if (name === 'rect') {
    return new RectanglePath(delegate);
  }

  throw Error(`Element ${name} is not supported yet`);
}
