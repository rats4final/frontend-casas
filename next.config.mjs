/** @type {import('next').NextConfig} */
const nextConfig = {
    transpilePackages: ['three'],
    images: {
        remotePatterns: [
            {
                protocol: 'http',
                hostname: '127.0.0.1',
                port: '9000',
                pathname: '/**'
            },
            {
                protocol: 'http',
                hostname:  process.env.NEXT_PUBLIC_AWS_HOSTNAME,
                pathname: '/**'
            }
        ]
    },
    webpack: (config) => {//zapworks config for its library
        config.module.rules.push({
            test: /zcv\.wasm$/,
            type: "javascript/auto",
            loader: "file-loader"
        })
        return config;
    }
};

export default nextConfig;
