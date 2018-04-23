let address                    = '';

if ( process.env.NODE_ENV === 'production' ) {
	// 生产环境地址
  address                      = 'http://localhost:3089';
} else {
  // 开发环境地址
  address                      = 'http://localhost:3089';
}

export const apiAddress         = address;
