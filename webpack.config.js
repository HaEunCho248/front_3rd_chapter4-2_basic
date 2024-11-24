const path = require('path'); //Node.js의 내장 모듈로 파일 경로를 다루는데 사용
const HtmlWebpackPlugin = require('html-webpack-plugin'); //HTML 파일 생성 및 번들 js 자동 주입을 위한 플러그인
const CopyPlugin = require('copy-webpack-plugin');// 파일/폴더를 복사하기 위한 플러그인

module.exports = {
  mode: 'production', //배포용 모드(코드 최적화, 압축)
  entry: {
    main: './js/main.js',//첫 번째 진입점
    products: './js/products.js' //두 번째 진입점
  },
  output: {
    filename: '[name].bundle.js', //[name]은 entry에서 지정한 키 값(main, products)
    path: path.resolve(__dirname, 'dist'), //출력 폴더 경로
    clean: true, // 빌드 전에 dist 폴더를 비워줌
    assetModuleFilename: 'images/[name][ext]'

  },
  module: {
    rules: [
      {
        test: /\.css$/, //.css 확장자로 끝나는 모든 파일 
        use: ['style-loader', 'css-loader'], //css처리를 위한 로더들
      },
     
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html', //원본 HTML 파일
      filename: 'index.html',//출력될 파일명
      inject: true // 번들된 js 자동 주입
    }),
    new CopyPlugin({
        patterns: [//복사할 파일/폴더 패턴 지정
            { 
              from: "images", //복사할 소스 폴더
              to: "images" // 복사될 목적지 폴더(dist 내부)
            }
          ],
    })
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'), // 정적 파일 제공 디렉토리
    },
    compress: true, // gzip 압축 사용
    port: 3000, // 개발 서버 포트
    hot: true, // 핫 모듈 교체(HMR) 활성화
    open: true, // 서버 시작 시 브라우저 자동 실행
    historyApiFallback: true // SPA를 위한 HTML5 History API 폴백
  },
  optimization: {
    minimize: true, //js 코드 압축
  },
  performance: {
    hints: false, // 큰 파일에 대한 경고 메시지 비활성화
  }
};