const fs = require("fs");

const html_init = `<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width" />
        <title>LiDAR</title>
        <script>while(true){setTimeout(window.location.reload(), 1000);}</script>
    </head>
    <body>
        <svg
            x="0"
            y="0"
            width="1000"
            height="1000"
            style="background-color: #032c0c"
        ></svg>
    </body>
</html>`;
const html_inner_header = `<circle `;
const html_inner_robo_footer = ` r="7" fill="#c00006" stroke-width="2" />`;
const html_inner_point_footer = ` r="7" fill="#009721" stroke-width="2" />`;
const html_footer = `</svg></body></html>`;
const scale = 1;

const robot_x = 200;
const robot_y = 100;
const robot_yaw = 45;
const senser_yaw = 0;
const senser_dist = 100;

function cal(robot_x, robot_y, robot_yaw, senser_yaw, senser_dist) {
    let point_yaw;
    if (robot_yaw + senser_yaw < 360) {
        point_yaw = robot_yaw + senser_yaw;
    } else {
        point_yaw = robot_yaw + senser_yaw - 360;
    }

    const point_x_from_robo =
        senser_dist * Math.sin((point_yaw * Math.PI) / 180);
    const point_y_from_robo =
        senser_dist * Math.cos((point_yaw * Math.PI) / 180);

    console.log(`robot: ${robot_x}, ${robot_y}`);
    console.log(
        `point: ${point_x_from_robo + robot_x}, ${point_y_from_robo + robot_y}`,
    );
    console.log(`====================`);

    return [
        robot_x * scale,
        robot_y * scale,
        (point_x_from_robo + robot_x) * scale,
        (point_y_from_robo + robot_y) * scale,
    ];
}

function draw([robot_x, robot_y, point_x, point_y]) {
    robot_x = robot_x + 500;
    robot_y = robot_y * -1 + 500;
    point_x = point_x + 500;
    point_y = point_y * -1 + 500;
    let html_before_header = fs
        .readFileSync("./index.html", "utf-8")
        .slice(0, -26);

    fs.writeFileSync(
        "./index.html",
        html_before_header +
            html_inner_header +
            `cx="${robot_x}" cy="${robot_y}"` +
            html_inner_robo_footer +
            html_inner_header +
            `cx="${point_x}" cy="${point_y}"` +
            html_inner_point_footer +
            html_footer,
    );
}

function init() {
    fs.writeFileSync("./index.html", html_init);
}
// init();
draw(cal(robot_x, robot_y, robot_yaw, senser_yaw, senser_dist));
