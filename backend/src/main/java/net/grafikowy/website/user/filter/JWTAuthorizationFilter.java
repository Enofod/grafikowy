package net.grafikowy.website.user.filter;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import net.grafikowy.website.config.SecurityProperties;
import net.grafikowy.website.user.constants.AuthorityConstant;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Arrays;
import java.util.Collection;
import java.util.stream.Collectors;

public class JWTAuthorizationFilter extends BasicAuthenticationFilter {

    private SecurityProperties securityProperties;

    public JWTAuthorizationFilter(AuthenticationManager authenticationManager, SecurityProperties securityProperties) {
        super(authenticationManager);
        this.securityProperties = securityProperties;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain) throws IOException, ServletException {
        String header = request.getHeader(securityProperties.getHeaderName());

        if (header == null || !header.startsWith(securityProperties.getTokenPrefix())) {
            chain.doFilter(request, response);
            return;
        }

        UsernamePasswordAuthenticationToken authenticationToken = getAuthentication(request);

        SecurityContextHolder.getContext().setAuthentication(authenticationToken);
        chain.doFilter(request, response);
    }

    private UsernamePasswordAuthenticationToken getAuthentication(HttpServletRequest request) {
        String token = request.getHeader(securityProperties.getHeaderName());

        if (token != null) {
            Claims claims = Jwts.parser()
                    .setSigningKey(securityProperties.getSecret().getBytes())
                    .parseClaimsJws(token.replace(securityProperties.getTokenPrefix(), ""))
                    .getBody();

            String user = claims.getSubject();
            if (user != null) {
                Collection<? extends GrantedAuthority> authorities =
                        Arrays.stream(claims.get(AuthorityConstant.AUTHORITIES_KEY).toString().split(","))
                                .map(SimpleGrantedAuthority::new)
                                .collect(Collectors.toList());

                return new UsernamePasswordAuthenticationToken(user, null, authorities);
            }
        }
        return null;
    }
}
