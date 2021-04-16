import 'reset-css';
import '$css/index.less';
import '@/js/check';
import '@fortawesome/fontawesome-free/css/all.min.css';

import { testPromise } from '@/js/promise';

async function test() {
  let ss = await testPromise();
  console.log(ss);
  console.log('await后面');
}

test();